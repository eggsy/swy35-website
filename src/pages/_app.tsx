import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";
import { Inter } from "next/font/google";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// CSS
import "nprogress/nprogress.css";
import "@/styles/globals.css";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

NProgress.configure({
  showSpinner: false,
  parent: "body",
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done(true));
Router.events.on("routeChangeError", () => NProgress.done(true));

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.includes("/studio")) return <Component {...pageProps} />;

  return (
    <div className={inter.className}>
      <NextSeo
        title="SWY35 Türkiye"
        titleTemplate="%s"
        themeColor="#DB0D17"
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

      <Analytics />
      <SpeedInsights />

      <div>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  );
}
