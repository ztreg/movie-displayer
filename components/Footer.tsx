
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-4 bottom-0 fixed mt-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between  h-[40px]">
        <p className="text-sm">&copy; {new Date().getFullYear()} Jonas Gertz. All rights reserved.</p>

        <Link className="flex items-center justify-center text-pink-400 hover:text-pink-600 transition" 
          href="https://github.com/ztreg" 
          target="_blank" 
          rel="noopener noreferrer">
          GitHub
          <Image
            src="/icons8-github.svg"
            width={32}
            height={32}
            priority
            alt="Github logo"
          />

        </Link>

        <Link 
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-pink-400 hover:text-pink-600 transition animate-blink"
        >
          Youtube 
        </Link>
      </div>
    </footer>
  );
};

export default Footer;