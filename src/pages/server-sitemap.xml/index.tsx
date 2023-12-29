import { client } from "../../../sanity/lib/client";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import type { Post } from "@/pages/[slug]";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = '*[_type == "post"]{slug,publishedAt}|order(publishedAt desc)';
  const posts = await client.fetch<Post[]>(query);

  const fields = posts.map((post) => ({
    loc: `https://swy35.com.tr/${post.slug.current}`,
    lastmod: new Date(post.publishedAt).toISOString(),
  }));

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {}
