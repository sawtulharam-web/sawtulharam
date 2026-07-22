export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "YouTube API key missing",
      });
    }

    const channelId = "UCKjpCiooBil-40uM0hOi4NQ";

    // ---------------------------------------------------------
    // 1. Get the latest videos uploaded to the channel
    // ---------------------------------------------------------
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`
    );

    if (!searchResponse.ok) {
      throw new Error(
        `YouTube search API error: ${searchResponse.status}`
      );
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return res.status(200).json([]);
    }

    const videoIds = searchData.items
      .map((item: any) => item.id?.videoId)
      .filter(Boolean)
      .join(",");

    if (!videoIds) {
      return res.status(200).json([]);
    }

    // ---------------------------------------------------------
    // 2. Get detailed information about those videos
    // ---------------------------------------------------------
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails`
    );

    if (!detailsResponse.ok) {
      throw new Error(
        `YouTube videos API error: ${detailsResponse.status}`
      );
    }

    const detailsData = await detailsResponse.json();

    // ---------------------------------------------------------
    // 3. Filter out Shorts
    // ---------------------------------------------------------
    const videos = detailsData.items
      .filter((video: any) => {
        const duration = video.contentDetails?.duration || "";

        /*
         * YouTube Shorts are generally short-form vertical videos.
         *
         * We do NOT use thumbnail dimensions here because thumbnails
         * are not a reliable way to determine whether a video is a Short.
         *
         * This first filter removes videos that are 60 seconds or less.
         *
         * NOTE:
         * If your channel contains normal videos shorter than 60 seconds,
         * we can refine the filtering later using the YouTube Shorts
         * classification / upload strategy.
         */

        const match = duration.match(
          /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
        );

        if (!match) {
          return false;
        }

        const hours = parseInt(match[1] || "0", 10);
        const minutes = parseInt(match[2] || "0", 10);
        const seconds = parseInt(match[3] || "0", 10);

        const totalSeconds =
          hours * 3600 +
          minutes * 60 +
          seconds;

        // Exclude videos of 60 seconds or less
        if (totalSeconds <= 60) {
          return false;
        }

        return true;
      })

      // ---------------------------------------------------------
      // 4. Sort newest first
      // ---------------------------------------------------------
      .sort(
        (a: any, b: any) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      )

      // ---------------------------------------------------------
      // 5. Keep only the latest 10 normal videos
      // ---------------------------------------------------------
      .slice(0, 10)

      // ---------------------------------------------------------
      // 6. Return only the data needed by Videos.tsx
      // ---------------------------------------------------------
      .map((video: any) => ({
        id: video.id,

        title: video.snippet.title,

        thumbnail:
          video.snippet.thumbnails.maxres?.url ||
          video.snippet.thumbnails.standard?.url ||
          video.snippet.thumbnails.high?.url ||
          video.snippet.thumbnails.medium?.url ||
          video.snippet.thumbnails.default?.url,

        publishedAt: video.snippet.publishedAt,
      }));

    return res.status(200).json(videos);

  } catch (error) {
    console.error("YouTube API error:", error);

    return res.status(500).json({
      error: "Failed fetching videos",
    });
  }
}
