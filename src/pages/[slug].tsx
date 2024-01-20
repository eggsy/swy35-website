import { GetServerSidePropsContext } from "next";
import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { TbCalendar, TbInfoCircle } from "react-icons/tb";
import { urlForImage } from "../../sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect } from "react";
import mediumZoom from "medium-zoom";
import clsx from "clsx";

export interface Post extends SanityDocument {
  title: string;
  publishedAt: string;
  mainImage?: SanityImage;
  language: string;
  author?: string;
  editor?: string;
}

const alertVariants = {
  default: "border-gray-200",
  info: "border-blue-200 bg-blue-50/50 text-blue-700 prose-p:text-blue-700 prose-strong:text-blue-700",
  warning:
    "border-yellow-200 bg-yellow-50/50 text-yellow-700 prose-p:text-yellow-700 prose-strong:text-yellow-700",
  danger:
    "border-red-200 bg-red-50/50 text-red-700 prose-p:text-red-700 prose-strong:text-red-700",
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const query =
    '*[_type == "post" && slug.current == $slug][0]{title, body, mainImage, publishedAt, author, editor, language}';

  const post = await client.fetch(query, { slug: params?.slug });

  if (!post) return { notFound: true };

  return {
    props: {
      post,
      slug: params?.slug,
    },
  };
};

export default function BlogPost({ post, slug }: { post: Post; slug: string }) {
  useEffect(() => {
    mediumZoom("[data-zoomable]:not(.medium-zoom-image)", {
      background: "rgba(0, 0, 0, 0.5)",
    });
  }, []);

  if (!post) return null;

  const meta = {
    title: post.title,
    slug,
    publishedAt: post.publishedAt,
    image: urlForImage(post.mainImage! ?? "") ?? "",
    description: `Read more about ${
      post.author ? `${post.author}'s` : "SWY35 Türkiye's"
    } "${
      post.title
    }" blog post and get ready to find yourself in an immersive world of cultural exchange!`,
  };

  return (
    <>
      <ArticleJsonLd
        useAppDir={false}
        url={`https://swy35.com.tr/${meta.slug}`}
        title={meta.title}
        images={[meta.image]}
        datePublished={meta.publishedAt}
        authorName={[
          ...(post.author?.split(", ").map((author) => ({ name: author })) ??
            []),
          ...(post.editor?.split(", ").map((editor) => ({ name: editor })) ??
            []),
        ]}
        description={meta.description}
        isAccessibleForFree={true}
        type="BlogPosting"
      />

      <NextSeo
        title={meta.title}
        titleTemplate="%s - SWY35 Türkiye Blog"
        description={meta.description}
        openGraph={{
          title: meta.title,
          siteName: "SWY35 Türkiye",
          images: [{ url: meta.image }],
          type: "article",
          article: {
            publishedTime: meta.publishedAt,
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
          <h1 className="text-2xl lg:text-3xl font-bold lg:leading-normal text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center text-black/50 gap-2">
            {post.language && (
              <Image
                src={`https://flagicons.lipis.dev/flags/1x1/${post.language}.svg`}
                alt={`Country ${post.language}`}
                width={16}
                height={16}
                className="rounded-full h-4 w-4"
                style={{
                  objectFit: "cover",
                }}
                title="The language of this post"
              />
            )}

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
              marks: {
                link: ({ value, children }) => {
                  if (value.href.startsWith("/")) {
                    return <Link href={value.href}>{children}</Link>;
                  }

                  return (
                    <a
                      href={value.href}
                      target={value.blank ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
                },
              },

              types: {
                alert: ({ value }) => {
                  if (!value.title && !value.body) return null;

                  const variantClasses =
                    alertVariants[
                      (value.variant as keyof typeof alertVariants) ?? "default"
                    ];

                  return (
                    <div
                      className={clsx(
                        "rounded-lg border px-6 py-4 mb-4 break-words",
                        variantClasses
                      )}
                    >
                      {value.title ? (
                        <h3 className="text-lg font-medium not-prose mb-2">
                          {value.title}
                        </h3>
                      ) : (
                        <div className="mb-2">
                          <TbInfoCircle size={24} />
                        </div>
                      )}

                      <div className="prose max-w-full prose-blue">
                        <PortableText value={value.body} />
                      </div>
                    </div>
                  );
                },

                image: ({ value }) => {
                  return (
                    <figure>
                      <img
                        src={urlForImage(value)!}
                        alt={value.alt}
                        loading="lazy"
                        className="w-full object-cover"
                        data-zoomable
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
