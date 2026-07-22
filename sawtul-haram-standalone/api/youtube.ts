export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "YouTube API key missing",
      });
    }

    const channelId = "UCKjpCiooBil-40uM0hOi4NQ";

    // Get latest 50 uploads
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`
    );

    const searchData = await searchResponse.json();

    const videoIds = searchData.items
      .map((item: any) => item.id?.videoId)
      .filter(Boolean)
      .join(",");

    if (!videoIds) {
      return res.status(200).json([]);
    }

    // Get detailed metadata
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails,statistics`
    );

    const detailsData = await detailsResponse.json();

    // Return diagnostic information
    const videos = detailsData.items
      .sort(
        (a: any, b: any) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      )
      .map((video: any) => ({
        id: video.id,

        title: video.snippet.title,

        description: video.snippet.description,

        tags: video.snippet.tags || [],

        duration: video.contentDetails.duration,

        thumbnail: video.snippet.thumbnails.high?.url,

        thumbnailWidth:
          video.snippet.thumbnails.high?.width || null,

        thumbnailHeight:
          video.snippet.thumbnails.high?.height || null,

        publishedAt: video.snippet.publishedAt,

        viewCount:
          video.statistics?.viewCount || null,
      }));

    return res.status(200).json(videos);

  } catch (error) {
    console.error("YouTube API error:", error);

    return res.status(500).json({
      error: "Failed fetching videos",
    });
  }
}
