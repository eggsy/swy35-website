import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

// CSS
import "@/styles/tailwind.css";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.includes("/studio")) return <Component {...pageProps} />;

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
