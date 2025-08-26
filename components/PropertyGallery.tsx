'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface PropertyGalleryProps {
  photos: Array<{
    url: string;
    imgix_url: string;
  }>;
  propertyTitle: string;
}

export default function PropertyGallery({ photos, propertyTitle }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-96">
        {/* Main Image */}
        <div className="md:col-span-2 md:row-span-2">
          <img
            src={`${photos[0].imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={`${propertyTitle} - Main view`}
            className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openLightbox(0)}
            width={400}
            height={300}
          />
        </div>

        {/* Secondary Images */}
        {photos.slice(1, 5).map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={`${photo.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
              alt={`${propertyTitle} - View ${index + 2}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(index + 1)}
              width={200}
              height={150}
            />
            {/* Show all photos button on last visible image */}
            {index === 3 && photos.length > 5 && (
              <div 
                className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => openLightbox(index + 1)}
              >
                <span className="text-white font-medium">
                  +{photos.length - 5} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={`${photos[selectedImage].imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={`${propertyTitle} - View ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
              width={600}
              height={400}
            />
            
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded">
              {selectedImage + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}