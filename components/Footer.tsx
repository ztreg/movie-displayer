"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6  h-[200px]">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>

        <Link 
          href="https://github.com/your-github" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-pink-400 hover:text-pink-600 transition"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
};

export default Footer;