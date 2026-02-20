import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const payload = posts.map((p) => ({
    title: p.data.title,
    description: p.data.description ?? '',
    slug: p.slug,
    tags: p.data.tags ?? [],
    pubDate: new Date(p.data.pubDate).toISOString(),
    body: p.body ?? ''
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
