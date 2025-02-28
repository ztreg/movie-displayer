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
            onError={() => setImageError(true)} // If error, show fallback
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
          className="object-contain bg-black"
          onError={() => setImageError(true)}
        />
    )
  }

  const decideCardType = () => w ? detailsImage() : cardImage()

  return (
    decideCardType()
  )
}

export default ImageComponent