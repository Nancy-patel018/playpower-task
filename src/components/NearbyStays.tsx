import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { NearbyProperty } from '../types';
import { formatCurrency } from '../utils/formatters';

interface NearbyStaysProps {
  properties: NearbyProperty[];
}

export const NearbyStays: React.FC<NearbyStaysProps> = ({ properties }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  return (
    <div className="py-12 border-b border-[#EBEBEB]">
      {/* Header & Pagination Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[22px] font-semibold text-[#222222]">More stays nearby</h3>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#222222]">
            {currentPage} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous stays"
              className="p-2 rounded-full border border-[#DDDDDD] hover:border-black text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next stays"
              className="p-2 rounded-full border border-[#DDDDDD] hover:border-black text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {properties.map((prop) => (
          <div key={prop.id} className="group cursor-pointer">
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100">
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h4 className="text-sm font-semibold text-[#222222] line-clamp-2 leading-tight group-hover:underline">
              {prop.title}
            </h4>

            <div className="flex items-center justify-between mt-1 text-xs text-[#222222]">
              <span className="font-semibold">{formatCurrency(prop.totalPriceForStay)}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-black" />
                <span>{prop.rating.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
