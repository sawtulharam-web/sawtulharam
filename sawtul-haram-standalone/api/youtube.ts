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
    // 1. Fetch the latest 50 uploads from the channel
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
    // 2. Get detailed information for all fetched videos
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
    // 3. Filter out vertical videos / Shorts
    // ---------------------------------------------------------
    const videos = detailsData.items
      .filter((video: any) => {
        const thumbnails = video.snippet?.thumbnails;

        if (!thumbnails) {
          return false;
        }

        // Use the largest available thumbnail
        const thumbnail =
          thumbnails.maxres ||
          thumbnails.standard ||
          thumbnails.high ||
          thumbnails.medium ||
          thumbnails.default;

        if (!thumbnail) {
          return false;
        }

        /*
         * Shorts are generally displayed in a vertical format.
         *
         * We compare the actual thumbnail dimensions rather than
         * using video duration, because this channel can have
         * Shorts longer than one minute.
         *
         * If the thumbnail is taller than it is wide,
         * we treat it as a Short and exclude it.
         */
        if (thumbnail.height > thumbnail.width) {
          return false;
        }

        return true;
      })

      // ---------------------------------------------------------
      // 4. Make sure newest videos come first
      // ---------------------------------------------------------
      .sort(
        (a: any, b: any) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      )

      // ---------------------------------------------------------
      // 5. Keep ONLY the latest 8 regular videos
      // ---------------------------------------------------------
      .slice(0, 8)

      // ---------------------------------------------------------
      // 6. Return only the data needed by the website
      // ---------------------------------------------------------
      .map((video: any) => {
        const thumbnails = video.snippet.thumbnails;

        return {
          id: video.id,

          title: video.snippet.title,

          thumbnail:
            thumbnails.maxres?.url ||
            thumbnails.standard?.url ||
            thumbnails.high?.url ||
            thumbnails.medium?.url ||
            thumbnails.default?.url,

          publishedAt: video.snippet.publishedAt,
        };
      });

    return res.status(200).json(videos);

  } catch (error) {
    console.error("YouTube API error:", error);

    return res.status(500).json({
      error: "Failed fetching videos",
    });
  }
}
