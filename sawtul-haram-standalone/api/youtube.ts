export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "YouTube API key is missing",
      });
    }

    const channelId = "UCKjpCiooBil-40uM0hOi4NQ";


    // 1. Get latest uploads
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=25&type=video`
    );

    const searchData = await searchResponse.json();

    if (!searchResponse.ok) {
      return res.status(searchResponse.status).json(searchData);
    }


    const videoIds = searchData.items
      .map((item: any) => item.id.videoId)
      .filter(Boolean)
      .join(",");


    // 2. Get details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails`
    );


    const detailsData = await detailsResponse.json();


    if (!detailsResponse.ok) {
      return res.status(detailsResponse.status).json(detailsData);
    }



    // 3. Detect Shorts using YouTube's own URL behaviour
    const checkShort = async (videoId: string) => {
      try {
        const response = await fetch(
          `https://www.youtube.com/shorts/${videoId}`,
          {
            method: "HEAD",
            redirect: "follow",
          }
        );

        return response.url.includes("/shorts/");
      } catch {
        return false;
      }
    };



    const shortFlags = await Promise.all(
      detailsData.items.map((video: any) =>
        checkShort(video.id)
      )
    );



    // 4. Keep only normal videos
    const videos = detailsData.items
      .filter((_: any, index: number) => !shortFlags[index])
      .map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail:
          video.snippet.thumbnails.high?.url ||
          video.snippet.thumbnails.medium?.url,
        publishedAt: video.snippet.publishedAt,
      }));



    return res.status(200).json(videos);


  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch YouTube videos",
    });
  }
}
