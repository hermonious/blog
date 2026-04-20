import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

const collator = new Intl.Collator("zh-Hans-CN", {
  sensitivity: "base",
  numeric: true
});

export function getSortedPosts(posts: BlogPost[]) {
  return posts
    .filter((post) => !post.data.draft)
    .sort((left, right) => right.data.pubDate.valueOf() - left.data.pubDate.valueOf());
}

export function getAllTags(posts: BlogPost[]) {
  return Array.from(
    new Set(
      posts.flatMap((post) => post.data.tags.map((tag) => tag.trim()).filter(Boolean))
    )
  ).sort(collator.compare);
}

export function getTagCounts(posts: BlogPost[]) {
  const counts = new Map<string, number>();

  for (const tag of posts.flatMap((post) => post.data.tags)) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort(([left], [right]) => collator.compare(left, right))
    .map(([tag, count]) => ({ tag, count }));
}

export function groupPostsByYear(posts: BlogPost[]) {
  const groups = new Map<number, BlogPost[]>();

  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    const group = groups.get(year) ?? [];
    group.push(post);
    groups.set(year, group);
  }

  return Array.from(groups.entries())
    .sort(([left], [right]) => right - left)
    .map(([year, entries]) => ({
      year,
      posts: entries.sort(
        (left, right) => right.data.pubDate.valueOf() - left.data.pubDate.valueOf()
      )
    }));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

export function estimateReadingTime(source: string) {
  const latinWords = source.trim().split(/\s+/).filter(Boolean).length;
  const cjkChars = (source.match(/[\u3400-\u9fff]/g) ?? []).length;
  const totalUnits = latinWords + cjkChars;

  return Math.max(1, Math.round(totalUnits / 220));
}
