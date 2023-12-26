import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";
import { Inter } from "next/font/google";

// CSS
import "@/styles/tailwind.css";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <NextSeo
        title="SWY35 Türkiye"
        description="Explore SWY35 Türkiye's journey in the Ship for World Youth program. Immerse yourself in Turkish culture, foster global connections, and join us in shaping a brighter future together."
        openGraph={{
          title: "SWY35 Türkiye",
          description:
            "Explore SWY35 Türkiye's journey in the Ship for World Youth program. Immerse yourself in Turkish culture, foster global connections, and join us in shaping a brighter future together.",
          images: [{ url: "/og-image.png" }],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <div>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  );
}
