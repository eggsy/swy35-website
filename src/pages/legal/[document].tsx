import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import { alertVariants, type Post } from "@/pages/[slug]";
import { useEffect } from "react";
import mediumZoom from "medium-zoom";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import clsx from "clsx";
import { TbInfoCircle } from "react-icons/tb";
import type { GetServerSidePropsContext } from "next";
import type { SanityDocument } from "sanity";

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const query =
    '*[_type == "doc" && slug.current == $document][0]{title, body}';

  const document = await client.fetch(query, { document: params?.document });

  if (!document) return { notFound: true };

  return {
    props: {
      document,
      slug: params?.document,
    },
  };
};

export default function LegalDocument({
  document,
  slug,
}: {
  document: { title: string; body: SanityDocument & { title: string } };
  slug: string;
}) {
  useEffect(() => {
    mediumZoom("[data-zoomable]:not(.medium-zoom-image)", {
      background: "rgba(0, 0, 0, 0.5)",
    });
  }, []);

  if (!document) return null;

  const meta = {
    title: document.title,
    slug,
    description: `SWY35 Türkiye's" ${document.title}.`,
  };

  return (
    <>
      <NextSeo
        title={meta.title}
        titleTemplate="%s - SWY35 Türkiye"
        description={meta.description}
        openGraph={{
          title: meta.title,
          siteName: "SWY35 Türkiye",
        }}
      />

      <main className="container-app">
        <header className="flex flex-col gap-2 mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold lg:leading-normal text-balance">
            {document.title}
          </h1>
        </header>

        <div className="prose max-w-full prose-blue">
          <PortableText
            value={document.body}
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
                        variantClasses,
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
