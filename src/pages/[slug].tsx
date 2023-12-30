import { GetServerSidePropsContext } from "next";
import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { TbCalendar } from "react-icons/tb";
import { urlForImage } from "../../sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { NextSeo } from "next-seo";

export interface Post extends SanityDocument {
  title: string;
  publishedAt: string;
  mainImage?: SanityImage;
  language: string;
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const query =
    '*[_type == "post" && slug.current == $slug][0]{title, body, mainImage, publishedAt, author, editor, language}';

  const post = await client.fetch(query, { slug: params?.slug });

  if (!post) return { notFound: true };

  return { props: { post } };
};

export default function BlogPost({ post }: { post: Post }) {
  if (!post) return null;

  return (
    <>
      <NextSeo
        title={post.title}
        titleTemplate="%s - SWY35 Türkiye Blog"
        description={`Read more about SWY35 Türkiye's "${post.title}" blog post and get ready to find yourself in an immersive world of cultural exchange!`}
        openGraph={{
          title: post.title,
          images: [{ url: urlForImage(post.mainImage! ?? "") ?? "" }],
          type: "article",
          article: {
            publishedTime: post.publishedAt,
            authors: [
              ...(post.author?.split(", ") ?? []),
              ...(post.editor?.split(", ") ?? []),
            ],
          },
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <main className="container-app">
        {post.mainImage && (
          <div className="relative w-full overflow-hidden h-[150px] md:h-[350px] rounded-lg mb-6">
            <Image
              priority
              src={urlForImage(post.mainImage ?? "") ?? ""}
              alt={(post.mainImage.alt as string) ?? ""}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <header className="flex flex-col gap-2 mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold">{post.title}</h1>

          <div className="flex items-center text-black/50 gap-2">
            {post.author && (
              <div className="flex items-center gap-2">
                <span className=" text-sm">by</span>
                <span className="border-b border-gray-300">{post.author}</span>
                {!post.editor && <span className=" text-sm">on</span>}
              </div>
            )}

            {post.editor && (
              <div className="flex items-center gap-2">
                <span className=" text-sm">edited by</span>
                <span className="border-b border-gray-300">{post.editor}</span>
                <span className=" text-sm">on</span>
              </div>
            )}

            <div className="flex items-center border-b border-gray-300 gap-2">
              <span>
                {new Date(post.publishedAt).toLocaleDateString(
                  post.language ?? "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </span>

              <TbCalendar />
            </div>
          </div>
        </header>

        <div className="prose max-w-full prose-blue">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }) => {
                  return (
                    <figure>
                      <img
                        src={urlForImage(value)!}
                        alt={value.alt}
                        loading="lazy"
                      />

                      {value.caption && (
                        <figcaption className="text-center text-black/50">
                          {value.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                },
              },
            }}
          />
        </div>
      </main>
    </>
  );
}
