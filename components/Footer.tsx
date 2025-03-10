import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        
        {/* Branding */}
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Jonas Gertz aka 🙂{" "}
          <span className="drop-shadow-md tracking-widest bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            🎬ZtregMDB 
          </span>
        </p>

        <p className="flex gap-2 text-sm text-gray-400">
          Made with   
          <Link 
            href="https://developer.themoviedb.org/docs/getting-started" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex space-x-6 text-pink-400 hover:text-pink-600 transition" 
            aria-label="Link to TMDB documentation"
          >
            TDMB 
          </Link>
        </p>

        {/* Social Links */}
        <div className="flex space-x-6 text-sm text-gray-400">
          <Link 
            href="https://github.com/ztreg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-pink-400 hover:text-pink-600 transition" 
            aria-label="Ztreg's GitHub Profile"
          >
            <Image src="/icons8-github.svg" width={24} height={24} alt="GitHub logo" />
            GitHub
          </Link>

          <Link 
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-pink-400 hover:text-pink-600 transition animate-blink"
            aria-label="Watch a surprise video on YouTube"
          >
            Free Stuff! 🎁
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
