import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "../../sanity/lib/client";
import { settingsQuery } from "../../sanity/lib/queries";

const geist = Geist({ subsets: ["latin"] });

export async function generateMetadata() {
  const settings = await client.fetch(settingsQuery);

  return {
    metadataBase: new URL("https://www.internationalstudenttips.com.au"),
    alternates: {
      canonical: "https://www.internationalstudenttips.com.au",
    },
    title: {
      default:
        settings?.title || "IST Blogs — International Student Tips Australia",
      template: "%s — IST Blogs",
    },
    description:
      settings?.description ||
      "Practical guides for international students in Australia.",
    keywords: settings?.keywords || ["international student australia"],
    authors: [{ name: "IST Blogs" }],
    openGraph: {
      type: "website",
      locale: "en_AU",
      url: "https://www.internationalstudenttips.com.au",
      siteName: settings?.title || "International Student Tips",
      title:
        settings?.title || "IST Blogs — International Student Tips Australia",
      description:
        settings?.description ||
        "Practical guides for international students in Australia.",
      images: [
        {
          url: "/logo.svg",
          width: 415,
          height: 175,
          alt: "International Student Tips",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        settings?.title || "IST Blogs — International Student Tips Australia",
      description:
        settings?.description ||
        "Practical guides for international students in Australia.",
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
      </head>
      <body className={geist.className}>
        <Navbar />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
