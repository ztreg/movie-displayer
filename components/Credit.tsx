import React from 'react'
import ImageComponent from './ImageComponent';

const Credit = ( { credit }: any) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w154";
  return (
    <div className='flex gap-4 min-h-[60px] h-[auto]'>
      <div className='relative w-[50px] h-[50px] my-2 object-contain'>
        <ImageComponent  
          baseUrl={imageBaseUrl}
          imageUrl={credit.profile_path}
          alt={`image ${credit.name}`}
        ></ImageComponent>
      </div>
      <div className='flex flex-col gap-1'>
        <p className="text-gray-200 text-m"> Name: {credit.name}</p>
        <p className="text-gray-200 text-m"> { credit.character ? "Role: " + credit.character : '' } </p>
        {
          credit.job ?  <p className="text-gray-200 text-m"> { credit.job }</p>  : ""
        }
      </div>
    </div>
  )
}

export default Credit