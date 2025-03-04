import React from 'react'
import Link from "next/link";
import { GenreProps } from '@/types/types';

const Category = ( { genre }: GenreProps ) => {
  const { name, id } = genre
  return (
    <Link href={`/movies?category=${id}`}>
      <div className="text-[14px] border border-pink-300 rounded-3xl bg-pink-900 text-pink-200 p-2 hover:bg-pink-600 hover:text-white transition-all">
        {name}
      </div>
    </Link>
  )
}

export default Category