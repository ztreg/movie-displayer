import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { GenreProvider } from "@/contexts/GenreContext";

import { Manrope } from "next/font/google";

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"], // You can add more subsets if needed
  display: "swap", // Ensures text remains visible while loading
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ztregmdb.vercel.app"),
  title: "ZtregMDB – Correct Ratings",
  description: "The only true source of movie ratings.",
  openGraph: {
    title: "ZtregMDB – Correct Ratings",
    description: "Get the most accurate movie ratings from ZtregMDB.",
    url: "https://ztregmdb.vercel.app",
    siteName: "ZtregMDB",
    images: [
      {
        url: "/snapshot.png",
        width: 1200,
        height: 630,
        alt: "ZtregMDB Movie List",
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
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"></meta>
      <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${manrope.className} min-h-screen themed-bg-pattern text-white`}>
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
