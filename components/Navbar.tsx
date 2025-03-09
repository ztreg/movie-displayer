'use client'

import Link from 'next/link'
import Image from "next/image";
import { SearchBar } from './'
import { useSearchParams  } from 'next/navigation';
import { useGenres } from '@/contexts/GenreContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { genres } = useGenres();
    const [ isGenresVisible, setIsGenresVisible ] = useState(false);
    const searchParams = useSearchParams();
    const category = searchParams.get("category") ?? "";
    const [activeCategory, setActiveCategory] = useState(category);
    
    useEffect(() => {
        const cat = genres.find(genre => genre.id === Number(category))?.name ?? ""
        setActiveCategory(cat);
    }, [genres, category]);


    const isActive = (href: string) => {
        // Convert href to a URL object for easy comparison
        const url = new URL(href, window.location.origin); // use window.location.origin to generate full URL for comparison
        const category = url.searchParams.get("category");
        console.log(url);
        
        return (
          searchParams.get("category") === category
        );
      };

      const handleToggleGenres = () => {
        setIsGenresVisible((prevState) => !prevState); // Toggle the visibility state
      };
    
    return (
        <header className="w-full z-10 bg-gray-800 p-2 relative">
            <nav className="max-w-[1440px] mx-auto flex flex-row justify-between sm:px-16 px-6 py-2 h-[auto] flex-wrap">
                <div className="flex gap-3 flex-wrap items-center">
                    <Link onClick={() => setIsGenresVisible(false)}  href="/" className="relative text-xl font-semibold flex items-center hover_line-animation">
                       Home 
                    </Link>
                    <Link onClick={() => setIsGenresVisible(false)}  href="/movies" className="relative text-xl font-semibold flex items-center hover_line-animation">
                       Browse 
                    </Link>
                    <button onClick={handleToggleGenres} className="text-xl font-semibold flex items-center pr-2 flex-wrap">
                        <div className='flex hover:underline pr-2 justify-center items-center'>
                            Categories
                            <Image
                                priority
                                src={isGenresVisible ? '/despand.svg' : '/expand.svg'}
                                width={20}
                                height={20}
                                alt="Category menu"
                                className='ml-2 text-white rounded-3xl'
                                style={{ width: "20px", height: "20px" }}
                            />
                        </div>
                        <div className='text-pink-300 font-bold'> {activeCategory ? `(${activeCategory})` : ""}</div>
                    </button>
                </div>
                <SearchBar />
                {/* Render genres below button if visible */}
                {isGenresVisible && (
                    <div className="mt-1 flex flex-wrap bg-gradient-to-r from-purple-900 via-pink-900 to-purple-600">
                        {genres.map((genre) => (
                            <Link
                                onClick={handleToggleGenres}
                                href={`/movies?category=${genre.id}`}
                                key={genre.id}
                                className={`p-4 w-1/2 border border-pink-500  hover:bg-pink-700 hover:text-white transition-all ${
                                isActive(`/movies?category=${genre.id}`)
                                    ? "border-b-2 border-white"
                                    : "border-transparent"
                                }`}
                            >
                                <p className="font-semibold">{genre.name}</p>
                            </Link>
                        ))}
                    </div>
                    )}
            </nav>
        </header>
    )
}

export default Navbar