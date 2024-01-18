import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import type { Post } from "@/pages/[slug]";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import CardBlog from "@/components/CardBlog";
import Select from "@/components/Form/Select";
import Input from "@/components/Form/Input";

export const getServerSideProps = async () => {
  const query =
    '*[_type == "post"]{title, mainImage, slug, publishedAt, language}|order(publishedAt desc)';

  const posts = await client.fetch(query);

  return { props: { posts } };
};

const knownLanguages = {
  gb: "English",
  tr: "Türkçe",
};

export default function Blog({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [search, setSearch] = useState((router.query.q as string) ?? "");

  const [selectedLanguage, setSelectedLanguage] = useState(
    (router.query.lang as string) ?? "all"
  );

  const languages = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.language)));
  }, [posts]);

  const getFilteredPosts = useMemo(() => {
    return posts
      .filter((post) =>
        selectedLanguage === "all" ? posts : post.language === selectedLanguage
      )
      .filter((post) =>
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
  }, [posts, search, selectedLanguage]);

  return (
    <main className="container-app">
      <div className="flex items-center flex-wrap justify-between gap-6 mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>

        <div className="flex flex-wrap flex-grow lg:justify-end items-center gap-2">
          <Select
            label="Filter by language"
            value={selectedLanguage}
            wrapperClass="w-full lg:w-auto"
            options={[
              {
                label: "All",
                value: "all",
              },
              ...languages.map((language) => ({
                label:
                  knownLanguages[language as keyof typeof knownLanguages] ??
                  language,
                value: language,
              })),
            ]}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);

              router.replace(`/blog?lang=${e.target.value}`, undefined, {
                shallow: true,
              });
            }}
          />

          <Input
            placeholder="Search..."
            wrapperClass="w-full lg:w-auto"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              router.replace(
                `/blog?lang=${selectedLanguage}&q=${e.target.value}`,
                undefined,
                {
                  shallow: true,
                }
              );
            }}
          />
        </div>
      </div>

      {getFilteredPosts.length === 0 && (
        <p className="text-black/50">
          No posts found with your query
          {selectedLanguage !== "all" &&
            ", maybe try removing the language filter?"}{" "}
          😢
        </p>
      )}

      {posts.length === 0 ? (
        <p className="text-black/50">
          There are no posts yet. Check back later! 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {getFilteredPosts.map((post) => (
            <CardBlog
              key={post.slug.current}
              title={post.title}
              href={`/${post.slug.current}`}
              date={new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              language={post.language}
              image={urlForImage(post.mainImage) ?? ""}
            />
          ))}
        </div>
      )}
    </main>
  );
}
