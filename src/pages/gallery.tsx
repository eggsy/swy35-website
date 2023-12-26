import Image from "next/image";
import { gallery } from "@/data/gallery";

export default function Gallery() {
  return (
    <main className="masonry container-app sm:masonry-sm md:masonry-md lg:masonry-lg">
      {gallery.map((item) => (
        <Image
          key={item}
          src={item}
          alt="Gallery item"
          width={500}
          height={500}
          loading="lazy"
          className="h-auto mb-2 max-w-full"
          style={{
            objectFit: "cover",
          }}
        />
      ))}
    </main>
  );
}
