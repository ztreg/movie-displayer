import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        
        {/* Branding */}
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Jonas Gertz. No rights reserved.
        </p>


        {/* Social Links */}
        <div className="flex space-x-6">
          <Link href="https://github.com/ztreg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-400 hover:text-pink-600 transition">
            <Image src="/icons8-github.svg" width={24} height={24} alt="GitHub logo" />
            GitHub
          </Link>

          <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-600 transition animate-blink">
            Free Stuff! 🎁
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
