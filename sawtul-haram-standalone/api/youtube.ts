export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "YouTube API key missing",
      });
    }

    const channelId = "UCKjpCiooBil-40uM0hOi4NQ";


    // Get latest uploads
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`
    );

    const searchData = await searchResponse.json();


    const videoIds = searchData.items
      .map((item:any)=>item.id.videoId)
      .filter(Boolean)
      .join(",");


    // Get details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails`
    );

    const detailsData = await detailsResponse.json();


    const videos = detailsData.items
      .filter((video:any)=>{

        const thumbnail =
          video.snippet.thumbnails.maxres ||
          video.snippet.thumbnails.standard ||
          video.snippet.thumbnails.high;


        if (!thumbnail) return true;


        console.log(
          video.snippet.title,
          thumbnail.width,
          thumbnail.height
        );


        // remove vertical videos
        if (thumbnail.height > thumbnail.width) {
          return false;
        }


        return true;

      })
      .map((video:any)=>({

        id: video.id,

        title: video.snippet.title,

        thumbnail:
          video.snippet.thumbnails.high.url,

        publishedAt:
          video.snippet.publishedAt,

      }));


    return res.status(200).json(videos);


  } catch(error){

    console.error(error);

    return res.status(500).json({
      error:"Failed fetching videos",
    });

  }
}
