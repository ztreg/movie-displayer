import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A movie list. Yes.",
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
        className={`relative`}
      >
        {children}
      </body>
    </html>
  );
}
