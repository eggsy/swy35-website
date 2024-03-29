import Image from "next/image";
import type { InstagramPost } from "@/pages/api/get-instagram-posts";
import { IoMdAlbums } from "react-icons/io";
import { RiMovieFill } from "react-icons/ri";

export const CardInstagram = (post: InstagramPost) => (
  <a
    href={post.permalink}
    rel="noopener noreferrer"
    target="_blank"
    title="Click to open in new tab"
    className="bg-gray-100 shadow aspect-square group relative rounded-lg overflow-hidden"
  >
    <Image
      src={post.media_type === "VIDEO" ? post.thumbnail_url! : post.media_url}
      alt={post.caption ?? "@swy35_turkiye's post"}
      className="aspect-square"
      draggable={false}
      fill
      style={{
        objectFit: "cover",
      }}
    />

    {post.media_type !== "IMAGE" && (
      <div className="absolute top-3 right-3 text-white drop-shadow-lg bg-white/10 backdrop-blur-sm rounded-full p-1">
        {post.media_type === "CAROUSEL_ALBUM" && <IoMdAlbums size={20} />}
        {post.media_type === "VIDEO" && <RiMovieFill size={20} />}
      </div>
    )}

    {post.caption && (
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
        <p className="lg:text-sm drop-shadow-md line-clamp-2 lg:line-clamp-1 group-hover:line-clamp-2 text-white font-medium ">
          {post.caption}
        </p>
      </div>
    )}
  </a>
);

export default CardInstagram;
