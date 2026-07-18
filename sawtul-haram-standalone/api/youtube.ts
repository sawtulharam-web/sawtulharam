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



    // 2. Get video details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails,player`
    );


    const detailsData = await detailsResponse.json();


    if (!detailsResponse.ok) {
      return res.status(detailsResponse.status).json(detailsData);
    }



    // 3. Return videos for testing
    const videos = detailsData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      thumbnail:
        video.snippet.thumbnails.high?.url ||
        video.snippet.thumbnails.medium?.url,
      publishedAt: video.snippet.publishedAt,
      duration: video.contentDetails.duration,
      embed: video.player?.embedHtml,
    }));


    return res.status(200).json(videos);


  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch YouTube videos",
    });
  }
}
