'use client'

import Link from 'next/link'
import {SuspendedSearchBar} from './'
import { useSearchParams  } from 'next/navigation';
import { useGenres } from '@/contexts/GenreContext';
import { useState } from 'react';

const Navbar = () => {
    const { genres } = useGenres();
    const [isGenresVisible, setIsGenresVisible] = useState(false); // State to toggle visibility

    const searchParams = useSearchParams();

    const isActive = (href: string) => {
        // Convert href to a URL object for easy comparison
        const url = new URL(href, "http://localhost");
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
            <div className="flex gap-6 flex-wrap">
                <Link href="/?type=movies" className="relative">
                    <h2
                        className={`text-xl font-semibold mb-4 hover:underline ${
                        isActive("/?type=movies") ? "border-b-2 border-blue-500 pb-1" : ""
                        }`}
                    >
                        Movies
                    </h2>
                </Link>
                <button onClick={handleToggleGenres} className="text-xl font-semibold mb-4 hover:underline">
                    {isGenresVisible ? "⬆️ Categories" : "⬇️ Categories"}
                </button>
            </div>
            <SuspendedSearchBar />

            {/* Render genres below button if visible */}
            {isGenresVisible && (
              <div className="mt-4 flex flex-wrap">
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="p-4 bg-gray-100 border rounded-md w-[calc(33%-1rem)]"
                  >
                    <h3 className="font-semibold">{genre.name}</h3>
                  </div>
                ))}
              </div>
            )}
       
         
        </nav>
      </header>
    )
}

export default Navbar