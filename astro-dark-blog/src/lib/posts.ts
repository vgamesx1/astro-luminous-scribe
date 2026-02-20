import { getCollection, type CollectionEntry } from 'astro:content';

type BlogEntry = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return posts.sort((a, b) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate));
}

export function getAllTags(posts: BlogEntry[]) {
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags ?? []) {
      const tag = String(t).trim();
      if (!tag) continue;
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

export function filterByTag(posts: BlogEntry[], tag: string) {
  const needle = String(tag).toLowerCase();
  return posts.filter((p) => (p.data.tags ?? []).some((t) => String(t).toLowerCase() === needle));
}
