import { GetStaticPropsContext } from "next";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import type { Post } from "@/pages/[slug]";
import { CardBlog } from "@/components/CardBlog";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const query = '*[_type == "post"]{title, mainImage, slug, publishedAt}';
  const posts = await client.fetch(query);

  return { props: { posts } };
};

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <main className="container-app">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-black/50">
          There are no posts yet. Check back later! 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <CardBlog
              key={post._id}
              title={post.title}
              href={`/${post.slug.current}`}
              date={new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              image={urlForImage(post.mainImage!) ?? ""}
            />
          ))}
        </div>
      )}
    </main>
  );
}
