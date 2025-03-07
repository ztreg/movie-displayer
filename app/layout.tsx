import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
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
        className={`min-h-screen themed-bg-pattern text-white`}
      >
        <div className="bg-black/40 min-h-screen ">

         <GenreProvider>
          <Navbar></Navbar>
            {children}
          <Footer></Footer>
        </GenreProvider>
    </div>

      </body>
    </html>
  );
}
