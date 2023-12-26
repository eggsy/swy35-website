import { Swiper, SwiperSlide } from "swiper/react";
import { GetStaticPropsContext } from "next";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import { A11y, Navigation, Pagination, Parallax } from "swiper/modules";
import {
  TbFriends,
  TbBrain,
  TbHeartHandshake,
  TbWorld,
  TbWorldCheck,
  TbDots,
  TbBrandInstagram,
  TbBrandX,
} from "react-icons/tb";
import type { Post } from "@/pages/[slug]";

// Data
import { swiper } from "@/data/swiper";
import { participants } from "@/data/participants";
import { members } from "@/data/members";
import { sponsors } from "@/data/sponsors";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/parallax";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";
import { CardBlog } from "../components/CardBlog";

const purpose = [
  {
    icon: <TbBrain />,
    title:
      "To promote mutual understanding and friendship between Japanese and foreign youths",
  },
  {
    icon: <TbHeartHandshake />,
    title:
      "To cultivate the spirit of international cooperation and the competence to practice it",
  },
  {
    icon: <TbWorld />,
    title:
      "To foster the youths with capability of showing leadership in various areas of global society",
  },
  {
    icon: <TbFriends />,
    title: "To broaden the global view of the Japanese youth",
  },
  {
    icon: <TbWorldCheck />,
    title:
      "Build an international network of young leaders from all over the world",
  },
  {
    icon: <TbDots />,
    title: "And so much more; the possibilities are endless!",
  },
];

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const query = '*[_type == "post"]{title, mainImage, slug, publishedAt}';
  const posts = await client.fetch(query);

  return { props: { posts } };
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, A11y, Parallax]}
        slidesPerView={1}
        navigation
        pagination={{ enabled: true, clickable: true, type: "progressbar" }}
        a11y={{ enabled: true }}
        parallax={{ enabled: true }}
      >
        {swiper.map((image) => (
          <SwiperSlide
            key={image}
            style={{
              height: "70svh",
            }}
          >
            <Image
              src={image}
              priority
              alt="Swiper Image"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Section id="about" title="What is SWY?">
        <p>
          The Ship for World Youth Leaders (SWY) program, operated by Cabinet
          Office, Government of Japan, is a program that involves youths from
          Japan and countries around the world. The participants study and
          discuss common issues from a global perspective and participate in
          various activities that involve multi-cultural and multi-national
          exchange opportunities to cultive international awareness and
          leadership. The program runs for over one month onshore and onboard
          the ship.
        </p>
      </Section>

      <Section title="Aims of the SWY program">
        <div className="grid lg:grid-cols-3 gap-8">
          {purpose.map((item) => (
            <Card key={item.title} icon={item.icon}>
              {item.title}
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Who is attending the SWY35 program?">
        <div className="grid grid-cols-2 md:flex items-center gap-x-4 gap-y-2 flex-wrap">
          {participants.map((country) => (
            <div
              key={country.country}
              className="bg-gray-100 flex hover:bg-gray-200 select-none items-center gap-2 pl-3 pr-4 rounded-lg"
            >
              <Image
                src={country.flag}
                alt={`Flag of ${country.country}`}
                width={40}
                height={40}
              />

              <span className="text-sm">{country.country}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Members of our delegation">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8">
          {members.map((member) => (
            <CardPeople key={member.name} {...member} />
          ))}
        </div>
      </Section>

      <Section
        title="Our sponsors"
        subtitleElement={
          <Link href="/contact" className="text-blue-600">
            👉 Become a sponsor
          </Link>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8">
          {sponsors.map((sponsor) => (
            <CardSponsor key={sponsor.name} {...sponsor} />
          ))}
        </div>
      </Section>

      {posts.length > 0 && (
        <Section title="Read our blog">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
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
        </Section>
      )}
    </main>
  );
}

const Section = ({
  title,
  children,
  subtitleElement,
  ...rest
}: React.PropsWithChildren<{
  title: string;
  subtitleElement?: React.ReactNode;
}> &
  React.HTMLAttributes<HTMLDivElement>) => (
  <section className="container-app my-24" {...rest}>
    <div className="flex flex-col gap-2 mb-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitleElement}
    </div>

    {children}
  </section>
);

const Card = ({
  icon,
  children,
}: React.PropsWithChildren<{ icon: React.ReactNode }>) => (
  <div className="bg-gray-100/60 rounded-lg p-8">
    <div className="flex text-3xl text-green-600 items-center justify-center w-16 h-16 bg-green-600/10 rounded-full mb-8">
      {icon}
    </div>

    {children}
  </div>
);

const CardPeople = ({
  image,
  name,
  role,
  social,
}: {
  image: string;
  name: string;
  role?: string;
  social?: {
    instagram?: string;
    twitter?: string;
  };
}) => (
  <div className="flex flex-col">
    <div className="bg-gray-100/30 mb-4 rounded-lg h-[150px] w-[150px] overflow-hidden">
      <Image
        src={`/people${image}`}
        alt={`Picture of ${name}`}
        style={{
          objectFit: "cover",
        }}
        height={150}
        width={150}
      />
    </div>

    <div>
      <h3 className="font-medium">{name}</h3>
      {role && <span className="text-sm text-gray-500">{role}</span>}
    </div>

    {social && (
      <div className="flex gap-2 mt-1">
        {social.instagram && (
          <a
            href={`https://instagram.com/${social.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbBrandInstagram size={18} />
          </a>
        )}

        {social.twitter && (
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbBrandX size={18} />
          </a>
        )}
      </div>
    )}
  </div>
);

const CardSponsor = ({ name, logo }: { name: string; logo: string }) => (
  <div className="flex items-center flex-col">
    <div className="bg-gray-100/30 mb-4 h-[150px] w-[150px] overflow-hidden">
      <Image
        src={logo}
        alt={`Picture of ${name}`}
        style={{
          objectFit: "cover",
        }}
        height={150}
        width={150}
      />
    </div>

    <div>
      <h3 className="font-medium text-center">{name}</h3>
    </div>
  </div>
);
