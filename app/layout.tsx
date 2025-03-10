import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { GenreProvider } from "@/contexts/GenreContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://ztregmdb.vercel.app"), // Ensures absolute URLs
  title: "ZtregMDB – The Best Movie Ratings",
  description: "The only true source of movie ratings.",
  openGraph: {
    title: "ZtregMDB – The Best Movie Ratings",
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
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
