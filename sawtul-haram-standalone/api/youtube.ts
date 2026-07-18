export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'YouTube API key is missing',
      });
    }

    const channelId = 'UCKjpCiooBil-40uM0hOi4NQ';

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=8&type=video`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));

    return res.status(200).json(videos);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Failed to fetch YouTube videos',
    });
  }
}
