import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site";
import { getSortedPosts } from "@/utils/blog";
import { withBase } from "@/utils/links";

export async function GET(context) {
  const posts = getSortedPosts(await getCollection("blog"));

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withBase(`posts/${post.id}/`)
    }))
  });
}
