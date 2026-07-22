export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "YouTube API key missing" });
    }

    const channelId = "UCKjpCiooBil-40uM0hOi4NQ";
    const VIDEOS_TO_SHOW = 9;

    // 1. Get latest uploads
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`
    );
    const searchData = await searchResponse.json();

    if (!searchResponse.ok || !Array.isArray(searchData.items)) {
      console.error("YouTube search API error:", searchData);
      return res.status(502).json({ error: "YouTube search request failed" });
    }

    const videoIds = searchData.items
      .map((item: any) => item?.id?.videoId)
      .filter(Boolean)
      .join(",");

    if (!videoIds) {
      return res.status(200).json([]); // channel has no videos matching search — return empty, not a crash
    }

    // 2. Get details including duration
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails`
    );
    const detailsData = await detailsResponse.json();

    if (!detailsResponse.ok || !Array.isArray(detailsData.items)) {
      console.error("YouTube videos API error:", detailsData);
      return res.status(502).json({ error: "YouTube video details request failed" });
    }

    // 3. Filter out Shorts using duration (ISO 8601, e.g. "PT45S", "PT4M12S")
    // Anything under 60 seconds is treated as a Short.
    // Note: YouTube now allows Shorts up to 3 minutes, so a small number of
    // longer Shorts could theoretically slip through — acceptable tradeoff
    // since there's no official "isShort" field in the API.
    const isLikelyShort = (duration: string): boolean => {
      const match = duration.match(/^PT(?:(\d+)M)?(?:(\d+)S)?$/);
      if (!match) return false;

      const minutes = parseInt(match[1] || "0", 10);
      const seconds = parseInt(match[2] || "0", 10);
      const totalSeconds = minutes * 60 + seconds;

      return totalSeconds > 0 && totalSeconds <= 60;
    };

    const videos = detailsData.items
      .filter((video: any) => {
        const duration = video?.contentDetails?.duration;
        return duration && !isLikelyShort(duration);
      })
      .sort(
        (a: any, b: any) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      )
      .slice(0, VIDEOS_TO_SHOW)
      .map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail:
          video.snippet.thumbnails.high?.url ||
          video.snippet.thumbnails.default?.url,
        publishedAt: video.snippet.publishedAt,
      }));

    // Cache at the edge for an hour so we're not burning API quota on every visitor
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    return res.status(200).json(videos);
  } catch (error) {
    console.error("Unhandled error in /api/youtube:", error);
    return res.status(500).json({ error: "Failed fetching videos" });
  }
}
