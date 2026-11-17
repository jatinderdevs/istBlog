import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "../../sanity/lib/client";
import { settingsQuery } from "../../sanity/lib/queries";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  canonicalUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  keywordList,
  organizationJsonLd,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const geist = Geist({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#048442",
};

export async function generateMetadata() {
  const settings = await client.fetch(settingsQuery);
  const siteTitle = settings?.title?.trim() || SITE_NAME;
  const description = settings?.description?.trim() || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(`${SITE_URL}/`),
    alternates: {
      canonical: canonicalUrl("/"),
    },
    title: {
      default: siteTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: keywordList(settings?.keywords),
    authors: [{ name: SITE_NAME }],
    applicationName: SITE_NAME,
    manifest: "/favicon/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url: canonicalUrl("/"),
      siteName: SITE_NAME,
      title: siteTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }) {
  const settings = await client.fetch(settingsQuery);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5FSDSPEZC9"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5FSDSPEZC9');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "tue38alcfi");
    `,
          }}
        />
      </head>
      <body className={geist.className}>
        <Navbar />
        <main>{children}</main>
        <Footer settings={settings} />
        <SpeedInsights />
      </body>
    </html>
  );
}
