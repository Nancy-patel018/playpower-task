import React, { useState } from 'react';
import { Grid } from 'lucide-react';
import { ListingData } from '../types';

interface HeroGridProps {
  images: ListingData['images'];
  onOpenPhotoTour: (index?: number) => void;
}

export const HeroGrid: React.FC<HeroGridProps> = ({ images, onOpenPhotoTour }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const primaryImage = images[0];
  const gridImages = images.slice(1, 5);

  return (
    <div className="relative my-4" id="photos">
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden max-h-[460px] bg-black"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Large Main Photo (Left 50%) */}
        {primaryImage && (
          <div
            className="md:col-span-2 relative cursor-pointer overflow-hidden aspect-[4/3] md:aspect-auto md:h-[460px]"
            onClick={() => onOpenPhotoTour(0)}
            onMouseEnter={() => setHoveredIndex(0)}
          >
            <img
              src={primaryImage.url}
              alt={primaryImage.alt}
              className={`w-full h-full object-cover transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== 0
                  ? 'opacity-80 scale-[1.01]'
                  : 'opacity-100 hover:scale-[1.02]'
              }`}
            />
          </div>
        )}

        {/* 4 Small Photos (Right 50% in 2x2 grid) */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-[460px]">
          {gridImages.map((img, idx) => {
            const actualIndex = idx + 1;
            return (
              <div
                key={img.id}
                className="relative cursor-pointer overflow-hidden h-[226px]"
                onClick={() => onOpenPhotoTour(actualIndex)}
                onMouseEnter={() => setHoveredIndex(actualIndex)}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    hoveredIndex !== null && hoveredIndex !== actualIndex
                      ? 'opacity-80 scale-[1.01]'
                      : 'opacity-100 hover:scale-[1.02]'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* "Show all photos" Button (Bottom Right) */}
      <button
        onClick={() => onOpenPhotoTour(0)}
        className="absolute bottom-6 right-6 bg-white hover:bg-[#F7F7F7] text-[#222222] text-sm font-semibold px-4 py-2.5 rounded-lg border border-black/80 shadow-md flex items-center gap-2 transition-transform active:scale-95 z-10"
      >
        <Grid className="w-4 h-4 stroke-[2]" />
        <span>Show all photos</span>
      </button>
    </div>
  );
};
