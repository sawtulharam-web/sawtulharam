export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'YouTube API key is missing',
      });
    }

    const channelId = 'UCKjpCiooBil-40uM0hOi4NQ';

    // 1. Get latest uploaded videos
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=15&type=video`
    );

    const searchData = await searchResponse.json();

    if (!searchResponse.ok) {
      return res.status(searchResponse.status).json(searchData);
    }

    const videoIds = searchData.items
      .map((item: any) => item.id.videoId)
      .filter(Boolean)
      .join(',');


    // 2. Get video details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails`
    );

    const detailsData = await detailsResponse.json();

    if (!detailsResponse.ok) {
      return res.status(detailsResponse.status).json(detailsData);
    }


    // Convert ISO duration to seconds
    function durationToSeconds(duration: string) {
      const match = duration.match(
        /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
      );

      if (!match) return 0;

      const hours = Number(match[1] || 0);
      const minutes = Number(match[2] || 0);
      const seconds = Number(match[3] || 0);

      return hours * 3600 + minutes * 60 + seconds;
    }


    // 3. Filter out Shorts
    const videos = detailsData.items
      .filter((video: any) => {

        const duration = durationToSeconds(
          video.contentDetails.duration
        );

        const width =
          video.contentDetails.dimension === '2d'
            ? video.snippet.thumbnails.high.width
            : null;


        // Remove very short clips
        if (duration < 60) {
          return false;
        }

        return true;
      })
      .map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail:
          video.snippet.thumbnails.high.url,
        publishedAt:
          video.snippet.publishedAt,
      }));


    return res.status(200).json(videos);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Failed to fetch YouTube videos',
    });
  }
}
