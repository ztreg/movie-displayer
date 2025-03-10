'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from './';
import { useSearchParams } from 'next/navigation';
import { useGenres } from '@/contexts/GenreContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { genres } = useGenres();
  const [isGenresVisible, setIsGenresVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? '';
  const [activeCategory, setActiveCategory] = useState(category);

  // Get current path to prevent hydration issues
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Highlight the active category
  useEffect(() => {
    const cat = genres.find((genre) => genre.id === Number(category))?.name ?? '';
    setActiveCategory(cat);
  }, [genres, category]);

  // Toggle genre menu visibility
  const handleToggleGenres = () => {
    setIsGenresVisible((prevState) => !prevState);
  };

  // Toggle the mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Determine if Home or Browse should be highlighted based on URL
  const isHomeActive = currentPath === '/';
  const isBrowseActive = currentPath?.startsWith('/movies');

  return (
    <header className="w-full z-10 bg-gray-800 p-2 relative">
      {/* Mobile Hamburger */}
      <div className="sm:hidden flex gap-4 items-center">
        <button onClick={toggleMenu} className="text-white text-2xl flex items-center">
          <Image
            src={`${isMenuOpen ? '/hamburger-close.svg' : '/hamburger-icon.svg'}`}
            alt="Hamburger menu"
            width={30}
            height={30}
          />
        </button>
        {/* LOGO */}
        <Link href="/" onClick={() => setIsGenresVisible(false)}>
          <h2 className="text-4xl font-bold drop-shadow-md tracking-widest bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            🎬ZtregMDB
          </h2>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-800 p-4 w-full z-20">
          <div className="flex gap-3 flex-row flex-wrap items-center">
            <Link
              href="/movies"
              className={`text-white font-semibold hover:underline ${isBrowseActive ? 'underline' : ''}`}
              onClick={toggleMenu}
            >
              Browse
            </Link>
            <button onClick={handleToggleGenres} className="text-white font-semibold hover:underline">
              Categories {activeCategory ? `(${activeCategory})` : ''}
            </button>

            <div className="mt-2">
              <SearchBar />
            </div>
          </div>
          {isGenresVisible && (
            <div className="mt-2 flex flex-col gap-2 p-2">
              {genres.map((genre) => (
                <Link
                  onClick={handleToggleGenres}
                  href={`/movies?category=${genre.id}`}
                  key={genre.id}
                  className="text-white font-semibold hover:bg-pink-700"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Desktop Navbar */}
      <nav className="max-w-[1440px] mx-auto flex-row justify-between sm:px-16 px-6 py-2 flex-wrap sm:block hidden">
        <div className="flex gap-3 flex-wrap items-center justify-between">
          <div className="flex gap-4 items-center">
            {/* Home Link */}
            <Link
              href="/"
              className={`text-xl font-semibold ${isHomeActive ? 'text-pink-500' : 'text-white'}`}
            >
              <h2 className="text-4xl font-bold drop-shadow-md tracking-widest bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                🎬ZtregMDB
              </h2>
            </Link>
            {/* Browse Link */}
            <Link
              href="/movies"
              className={`text-xl font-semibold ${isBrowseActive ? 'text-pink-500' : 'text-white'}`}
            >
              Browse
            </Link>

            <button onClick={handleToggleGenres} className="flex text-xl font-semibold pr-2 flex-wrap items-center">
              <div className="flex hover:underline pr-2 items-center justify-center">
                Categories
                <Image
                  priority
                  src={isGenresVisible ? '/despand.svg' : '/expand.svg'}
                  width={20}
                  height={20}
                  alt="Category menu"
                  className="ml-2 text-white rounded-3xl"
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
              <div className="text-pink-300 font-bold">{activeCategory ? `(${activeCategory})` : ''}</div>
            </button>
          </div>
          <div className="hidden sm:block">
            <SearchBar />
          </div>
        </div>

        {/* Render genres below button if visible */}
        {isGenresVisible && (
          <div className="mt-1 flex flex-wrap bg-gradient-to-r from-purple-900 via-pink-900 to-purple-600">
            {genres.map((genre) => (
              <Link
                onClick={handleToggleGenres}
                href={`/movies?category=${genre.id}`}
                key={genre.id}
                className={`p-4 w-1/2 border border-pink-500 hover:bg-pink-700 hover:text-white transition-all ${
                  category === String(genre.id) ? 'border-b-2 border-white' : 'border-transparent'
                }`}
              >
                <p className="font-semibold">{genre.name}</p>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
