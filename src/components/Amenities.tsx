import React, { useState } from 'react';
import {
  Utensils,
  Wifi,
  Laptop,
  Car,
  Waves,
  Bath,
  Dog,
  Camera,
  Wind,
  Tv,
  Refrigerator,
  Microwave,
  X,
} from 'lucide-react';
import { Amenity } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface AmenitiesProps {
  amenities: Amenity[];
}

export const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  const [isOpen, setIsOpen] = useState(false);

  useLockBodyScroll(isOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-[#222222]" />;
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-[#222222]" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-[#222222]" />;
      case 'Car':
        return <Car className="w-6 h-6 text-[#222222]" />;
      case 'Waves':
        return <Waves className="w-6 h-6 text-[#222222]" />;
      case 'Bath':
        return <Bath className="w-6 h-6 text-[#222222]" />;
      case 'Dog':
        return <Dog className="w-6 h-6 text-[#222222]" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-[#222222]" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-[#222222]" />;
      case 'Tv':
        return <Tv className="w-6 h-6 text-[#222222]" />;
      case 'Refrigerator':
        return <Refrigerator className="w-6 h-6 text-[#222222]" />;
      case 'Microwave':
        return <Microwave className="w-6 h-6 text-[#222222]" />;
      default:
        return <Wifi className="w-6 h-6 text-[#222222]" />;
    }
  };

  const previewAmenities = amenities.slice(0, 8);

  return (
    <div className="py-8 border-b border-[#EBEBEB]" id="amenities">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-6">What this place offers</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
        {previewAmenities.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-1">
            {getAmenityIcon(item.iconName)}
            <span className="text-base text-[#222222]">{item.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-xl border border-[#222222] text-[#222222] font-semibold text-base hover:bg-gray-50 transition-all active:scale-95"
      >
        Show all {amenities.length} amenities
      </button>

      {/* Show All Amenities Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="What this place offers"
            className="bg-white w-full max-w-2xl rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-modal relative animate-slide-up"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close amenities modal"
              className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-[#222222]" />
            </button>

            <h3 className="text-2xl font-bold text-[#222222] mt-8 mb-6">What this place offers</h3>

            <div className="space-y-6">
              {amenities.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-3 border-b border-[#EBEBEB] last:border-none">
                  {getAmenityIcon(item.iconName)}
                  <span className="text-base text-[#222222] font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
