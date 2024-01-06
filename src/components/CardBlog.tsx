import Image from "next/image";
import Link from "next/link";

export const CardBlog = ({
  title,
  date,
  image,
  href,
  language,
}: {
  title: string;
  date: string;
  image: string;
  href: string;
  language?: string;
}) => (
  <Link
    href={href}
    className="flex flex-col hover:opacity-75 transition-opacity"
  >
    <div className="bg-gray-100/30 mb-4 overflow-hidden">
      <Image
        src={image || "/og-image.png"}
        alt={`Picture of ${title}`}
        height={200}
        width={500}
        className="rounded-lg"
        style={{
          objectFit: "cover",
          height: "200px",
          width: "500px",
        }}
      />
    </div>

    <div>
      <h3 className="text-lg font-medium">{title}</h3>

      <div className="flex items-center flex-wrap gap-2">
        {language && (
          <Image
            src={`https://flagicons.lipis.dev/flags/1x1/${language}.svg`}
            alt={`Country ${language}`}
            width={16}
            height={16}
            className="rounded-full h-4 w-4"
            style={{
              objectFit: "cover",
            }}
            title="The language of this post"
          />
        )}

        <span className="text-gray-500">{date}</span>
      </div>
    </div>
  </Link>
);
