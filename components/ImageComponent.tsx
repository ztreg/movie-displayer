"use client";
import React, { useState } from 'react'
import Image from "next/image";
import { ImageComponentProps } from '@/types/types';
const ImageComponent = ( { baseUrl, imageUrl, w, h, alt }: ImageComponentProps ) => {

  const [imageError, setImageError] = useState(false);
  const cardImage = () => {
    return (
          <Image
            src={ !imageError && imageUrl ? `${baseUrl}${imageUrl}` : "/no-image.svg" }
            alt={alt}
            sizes="10"
            fill
            priority
            className="object-contain"
            onError={() => setImageError(true)}
          />
    )
  }

  const detailsImage = () => {
    const width = Number(w)
    const height = Number(h)
    
    return (
        <Image
          src={ !imageError && imageUrl ? `${baseUrl}${imageUrl}` : "/no-image.svg" }
          alt={alt}
          width={width}
          height={height}
          priority
          className="object-contain bg-gradient-to-r from-gray-800 via-pink-800 to-gray-900 rounded-2xl"
          onError={() => setImageError(true)}
        />
    )
  }

  const decideImageType = () => w ? detailsImage() : cardImage()

  return (
    decideImageType()
  )
}

export default ImageComponent