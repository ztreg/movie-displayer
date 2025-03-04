import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components";
import { GenreProvider } from "@/contexts/GenreContext";

export const metadata: Metadata = {
  title: "A movie list. Incredible.",
  description: "The greatest list of movies you have ever seen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-gradient-to-r from-purple-800 via-pink-600 to-red-500 text-white`}
      >
        <div className="bg-black/40 min-h-screen ">

         <GenreProvider>
          <Navbar></Navbar>
          {children}
        </GenreProvider>
    </div>

      </body>
    </html>
  );
}
