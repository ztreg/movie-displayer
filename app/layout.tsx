import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { GenreProvider } from "@/contexts/GenreContext";

export const metadata: Metadata = {
  title: "ZtregMDB. Correct Ratings.",
  description: "The only true source of movie ratings.",
  metadataBase: new URL("https://www.ztregmdb.com"), // Replace with your actual base URL
  openGraph: {
    title: "ZtregMDB. Correct Ratings.",
    description: "The only true source of movie ratings.",
    url: "https://www.ztregmdb.com", // Replace with your actual site URL
    siteName: "ZtregMDB",
    images: [
      {
        url: "/snapshot.png", // Replace with your actual image path
        width: 1200,
        height: 630,
        alt: "Movie List Poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZtregMDB. Correct Ratings.",
    description: "The only true source of movie ratings.",
    images: [
      {
        url: "/snapshot.png", // Replace with your actual image path
        width: 1200,
        height: 630,
        alt: "Movie List Poster",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

<head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="preload"
          href="/images/hero-image.jpg"
          as="image"
          type="image/jpeg"
          crossOrigin="anonymous" // Correct property name
        />
      </head>
      <body className={`min-h-screen themed-bg-pattern text-white`}>
        <div className="bg-black/40 min-h-screen ">
          <GenreProvider>
            <Navbar />
            <div className="min-h-[80vh]">{children}</div>
            <Footer />
          </GenreProvider>
        </div>
      </body>
    </html>
  );
}
