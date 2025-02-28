import React from 'react'
import Link from "next/link";
import { GenreProps } from '@/types/types';

const Category = ( { genre }: GenreProps ) => {
  const { name, id } = genre
  return (
    <Link href={`/?category=${id}`}>
      <div className='text-[14px] border-gray-700 rounded-3xl bg-gray-500 text-white p-2 hover:bg-gray-300 hover:text-black-100'>
          {name}
      </div>
    </Link>
  )
}

export default Category