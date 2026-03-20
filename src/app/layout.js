import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.internationalstudenttips.com.au"),
  title: {
    default: "IST Blogs — International Student Tips Australia",
    template: "%s — IST Blogs",
  },
  description:
    "Practical guides on visa rules, work rights, housing, banking and everything you need to thrive as an international student in Australia.",
  keywords: [
    "international student australia",
    "student visa australia",
    "work rights australia",
    "TFN australia",
    "student housing australia",
  ],
  authors: [{ name: "IST Blogs" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.internationalstudenttips.com.au",
    siteName: "International Student Tips",
    title: "IST Blogs — International Student Tips Australia",
    description: "Practical guides for international students in Australia.",
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
    title: "IST Blogs — International Student Tips Australia",
    description: "Practical guides for international students in Australia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {}
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
        <Footer />
      </body>
    </html>
  );
}
