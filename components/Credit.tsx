import React from 'react'
import ImageComponent from './ImageComponent';

const Credit = ( { credit }: any) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w154";
  return (
    <div className='flex gap-4'>
      <ImageComponent  
        baseUrl={imageBaseUrl}
        imageUrl={credit.profile_path}
        w="60"
        h="20"
        alt={`image ${credit.name}`}
      ></ImageComponent>
      <div className='flex flex-col gap-1'>
        <p className="text-gray-200 text-m"> Name: {credit.name}</p>
        <p className="text-gray-200 text-m"> {
          credit.character ? 
          "Character: " + credit.character : 
          "Department: " + credit.known_for_department
          }
        </p>
        {
          credit.job ?  <p className="text-gray-200 text-m">Job:  { credit.job }</p>  : ""
        }
      </div>
    </div>
  )
}

export default Credit