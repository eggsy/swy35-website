import Image from "next/image";
import mediumZoom from "medium-zoom";
import { gallery } from "@/data/gallery";
import { useEffect } from "react";

export default function Gallery() {
  useEffect(() => {
    mediumZoom("[data-zoomable]", {
      background: "rgba(0, 0, 0, 0.5)",
    });
  }, []);

  return (
    <main className="container-app">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>

      <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg">
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
            data-zoomable
          />
        ))}
      </div>
    </main>
  );
}
