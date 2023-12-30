import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import type { Post } from "@/pages/[slug]";
import { CardBlog } from "@/components/CardBlog";
import { useMemo, useState } from "react";
import Image from "next/image";
import { TbCheck } from "react-icons/tb";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  const query =
    '*[_type == "post"]{title, mainImage, slug, publishedAt, language}|order(publishedAt desc)';

  const posts = await client.fetch(query);

  return { props: { posts } };
};

export default function Blog({ posts }: { posts: Post[] }) {
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState(
    router.query.lang ?? "all"
  );

  const languages = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.language)));
  }, [posts]);

  return (
    <main className="container-app">
      <div className="flex items-center flex-wrap justify-between gap-6 mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>

        <div className="flex items-center flex-shrink-0 gap-2">
          <span className="text-black/50 text-sm">Filter by language:</span>

          {languages.map((language) => (
            <button
              key={language}
              type="button"
              className="hover:opacity-50 flex-shrink-0 transition-opacity relative"
              onClick={() => {
                setSelectedLanguage(
                  language === selectedLanguage ? "all" : language
                );

                if (language === selectedLanguage) router.replace("/blog");
                else
                  router.replace(`/blog?lang=${language}`, undefined, {
                    shallow: true,
                  });
              }}
            >
              {selectedLanguage === language && (
                <div className="absolute rounded-full inset-0 grid place-content-center bg-black/20 text-white">
                  <TbCheck size={16} />
                </div>
              )}
              <Image
                src={`https://flagicons.lipis.dev/flags/1x1/${language}.svg`}
                alt={`Country ${language}`}
                width={24}
                height={24}
                className="rounded-full h-6 w-6"
                style={{
                  objectFit: "cover",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-black/50">
          There are no posts yet. Check back later! 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts
            .filter((post) =>
              selectedLanguage === "all"
                ? true
                : post.language === selectedLanguage
            )
            .map((post) => (
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
