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
      return res.status(200).json([]);
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

    const parseDurationSeconds = (duration: string): number => {
      const match = duration.match(/^PT(?:(\d+)M)?(?:(\d+)S)?$/);
      if (!match) return -1;
      const minutes = parseInt(match[1] || "0", 10);
      const seconds = parseInt(match[2] || "0", 10);
      return minutes * 60 + seconds;
    };

    // Real, reliable check: ask YouTube's oEmbed service for the video's
    // aspect ratio via its /shorts/ URL. Vertical (height > width) = genuine Short.
    const isVerticalShort = async (videoId: string): Promise<boolean> => {
      try {
        const oembedRes = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(
            `https://www.youtube.com/shorts/${videoId}`
          )}&format=json`
        );
        if (!oembedRes.ok) return false; // fail-safe: don't hide a video we're unsure about
        const oembedData = await oembedRes.json();
        return oembedData.height > oembedData.width;
      } catch {
        return false;
      }
    };

    // Candidates: obviously long videos (>3 min) skip the extra check entirely.
    // Anything ≤3 min gets the oEmbed aspect-ratio check (covers Shorts up to
    // YouTube's newer 3-minute limit, which duration-only filtering missed).
    const checks = await Promise.all(
      detailsData.items.map(async (video: any) => {
        const durationSeconds = parseDurationSeconds(
          video?.contentDetails?.duration || ""
        );

        if (durationSeconds > 180) {
          return { video, isShort: false };
        }

        const short = await isVerticalShort(video.id);
        return { video, isShort: short };
      })
    );

    const videos = checks
      .filter(({ isShort }) => !isShort)
      .map(({ video }) => video)
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

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    return res.status(200).json(videos);
  } catch (error) {
    console.error("Unhandled error in /api/youtube:", error);
    return res.status(500).json({ error: "Failed fetching videos" });
  }
}
