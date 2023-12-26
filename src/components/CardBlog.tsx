import Image from "next/image";
import Link from "next/link";

export const CardBlog = ({
  title, date, image, href,
}: {
  title: string;
  date: string;
  image: string;
  href: string;
}) => (
  <Link
    href={href}
    className="flex flex-col hover:opacity-75 transition-opacity"
  >
    <div className="bg-gray-100/30 mb-4 overflow-hidden">
      <Image
        src={image}
        alt={`Picture of ${title}`}
        height={500}
        width={500}
        className="rounded-lg"
        style={{
          objectFit: "cover",
        }} />
    </div>

    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <span className="text-gray-500">{date}</span>
    </div>
  </Link>
);
