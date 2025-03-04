'use client'

import Link from 'next/link'
import Image from "next/image";
import {SuspendedSearchBar} from './'
import { useSearchParams  } from 'next/navigation';
import { useGenres } from '@/contexts/GenreContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { genres } = useGenres();
    const [ isGenresVisible, setIsGenresVisible ] = useState(false); // State to toggle visibility
    const searchParams = useSearchParams();
    const category = searchParams.get("category") ?? ""; // Get query from URL if available
    const [activeCategory, setActiveCategory] = useState(category);
    
    useEffect(() => {
        const cat = genres.find(genre => genre.id === Number(category))?.name ?? ""
        setActiveCategory(cat);
    }, [genres, category]);


    const isActive = (href: string) => {
        // Convert href to a URL object for easy comparison
        const url = new URL(href, window.location.origin); // use window.location.origin to generate full URL for comparison
        const type = url.searchParams.get("type");
        const category = url.searchParams.get("category");

        return (
          searchParams.get("type") === type &&
          searchParams.get("category") === category
        );
      };

      const handleToggleGenres = () => {
        setIsGenresVisible((prevState) => !prevState); // Toggle the visibility state
      };
    
    return (
        <header className="w-full absolute z-10">
            <nav className="max-w-[1440px] mx-auto flex flex-row justify-between sm:px-16 px-6 py-4 mb-6 flex-wrap">
                <div className="flex gap-6 flex-wrap items-center">
                    <Link onClick={() => setIsGenresVisible(false)}  href="/?type=movies" className="relative text-xl font-semibold flex items-center hover_line-animation">
                       Movies 
                    </Link>
                    <button onClick={handleToggleGenres} className="text-xl font-semibold flex items-center pr-2 flex-wrap">
                        <div className='flex hover:underline pr-2'>
                            Categories
                            <Image
                                priority
                                src={isGenresVisible ? '/despand.svg' : '/expand.svg'}
                                width={20}
                                height={20}
                                alt="Category menu"
                                className='ml-2 text-white rounded-3xl'
                            />
                        </div>
                        { activeCategory ?? ( ` (${activeCategory} )` ) }
                    </button>
                </div>
                <SuspendedSearchBar />

                {/* Render genres below button if visible */}
                {isGenresVisible && (
                    <div className="mt-1 flex flex-wrap">
                        {genres.map((genre) => (
                        <Link
                            onClick={handleToggleGenres}
                            href={`/?type=movies&category=${genre.id}`}
                            key={genre.id}
                            className={`p-4 w-1/2 border pb-2 pt-2 bg-gradient-to-r from-purple-800 via-pink-600 to-red-500 text-white hover:underline hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                            isActive(`/?type=movies&category=${genre.id}`)
                                ? "border-b-2 border-blue-500"
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