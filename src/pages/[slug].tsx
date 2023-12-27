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
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const query =
    '*[_type == "post" && slug.current == $slug][0]{title, body, mainImage, publishedAt}';
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
        openGraph={{
          title: post.title,
          images: [{ url: urlForImage(post.mainImage! ?? "") ?? "" }],
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

        <div className="flex mb-4 flex-wrap items-start justify-between">
          <h1 className="text-4xl font-bold">{post.title}</h1>

          <div className="flex items-center gap-2 text-black/50">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>

            <TbCalendar />
          </div>
        </div>

        <div className="prose max-w-full prose-blue">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }) => {
                  return (
                    <img
                      src={urlForImage(value)!}
                      alt={value.alt}
                      loading="lazy"
                    />
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
