import React, { useState } from 'react';
import { Home, Plus, Minus, ChevronRight, Search, X } from 'lucide-react';
import { ListingData } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface LocationSectionProps {
  location: ListingData['location'];
}

export const LocationSection: React.FC<LocationSectionProps> = ({ location }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useLockBodyScroll(isOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <div className="py-8 border-b border-[#EBEBEB]" id="location">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-1">Where you'll be</h3>
      <p className="text-base text-[#222222] mb-6">{location.neighborhood}, {location.state}, {location.country}</p>

      {/* Interactive Vector Map Container */}
      <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-[#DDDDDD] bg-[#E8F0E6] mb-4 shadow-sm">
        {/* Map Grid Pattern & Coastline SVG */}
        <svg
          className="w-full h-full absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D0E2CF" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Water Area */}
          <path d="M 0 0 L 220 0 L 140 420 L 0 420 Z" fill="#B3D9EA" />

          {/* Land Area Grid */}
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Circular Highlight overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#82C341]/20 border-2 border-[#82C341]/40 pointer-events-none" />

        {/* Home Location Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <Home className="w-6 h-6 fill-current" />
          </div>
        </div>

        {/* Map Search / Expand Button */}
        <button className="absolute top-4 left-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-50 text-[#222222]">
          <Search className="w-4 h-4" />
        </button>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col bg-white rounded-lg shadow-md border border-[#DDDDDD] overflow-hidden">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
            aria-label="Zoom in"
            className="p-2.5 hover:bg-gray-100 text-[#222222] border-b border-[#EBEBEB]"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            aria-label="Zoom out"
            className="p-2.5 hover:bg-gray-100 text-[#222222]"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-[#717171] mb-8">Exact location will be provided after booking.</p>

      {/* Neighbourhood Highlights */}
      <div className="max-w-2xl">
        <h4 className="text-base font-semibold text-[#222222] mb-2">Neighbourhood highlights</h4>
        <p className="text-sm text-[#222222] leading-relaxed line-clamp-3">
          {location.neighborhoodHighlights}
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-2 font-semibold text-sm text-[#222222] underline underline-offset-4 flex items-center gap-1 hover:text-black"
        >
          <span>Show more</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Neighbourhood Highlights Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Neighbourhood highlights"
            className="bg-white w-full max-w-xl rounded-2xl p-6 md:p-8 shadow-modal relative animate-slide-up"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close neighbourhood modal"
              className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-[#222222]" />
            </button>

            <h3 className="text-2xl font-bold text-[#222222] mt-6 mb-4">Where you'll be</h3>
            <p className="text-sm font-medium text-[#717171] mb-6">
              {location.neighborhood}, {location.city}, {location.state}, {location.country}
            </p>

            <div className="text-sm text-[#222222] leading-relaxed space-y-4">
              <p>{location.neighborhoodHighlights}</p>
              <p>
                Candolim is known for its serene beaches, water sports, vibrant shacks, and rich heritage. The location balances tranquility with easy access to main market streets.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
