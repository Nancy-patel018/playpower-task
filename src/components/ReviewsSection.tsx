import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  Key,
  MessageSquare,
  MapPin,
  Tag,
  Star,
  X,
} from 'lucide-react';
import { Review, ReviewCategoryRatings } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  ratings: ReviewCategoryRatings;
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
  reviewCount,
  ratings,
  reviews,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useLockBodyScroll(isOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <div className="py-12 border-b border-[#EBEBEB]" id="reviews">
      {/* Laurel Header Section */}
      <div className="text-center py-6">
        <div className="flex items-center justify-center gap-3">

          {/* Left Laurel Branch PNG */}
          <img
            src="/images/ui/laurel-left.png"
            alt="Laurel left"
            className="h-[88px] w-auto object-contain"
          />

          {/* Rating Number */}
          <span className="text-[72px] leading-none font-extrabold text-[#222222] tracking-tight">
            {rating.toFixed(2)}
          </span>

          {/* Right Laurel Branch PNG */}
          <img
            src="/images/ui/laurel-right.png"
            alt="Laurel right"
            className="h-[88px] w-auto object-contain"
          />

        </div>
        <h3 className="text-[22px] font-bold text-[#222222] mt-4">Guest favourite</h3>
        <p className="text-sm text-[#6E9EBA] mt-1.5 max-w-[280px] mx-auto leading-snug text-center">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="text-sm font-semibold text-[#222222] underline underline-offset-4 mt-3 hover:text-black">
          How reviews work
        </button>
      </div>


      {/* Category Ratings Bar Columns */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 py-8 border-y border-[#EBEBEB] my-8 text-center md:text-left">
        {/* Overall */}
        <div className="col-span-2 md:col-span-1 border-r border-[#EBEBEB] pr-4">
          <div className="text-xs font-semibold text-[#222222] mb-1">Overall rating</div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#222222] rounded-full w-[98%]" />
          </div>
        </div>

        {/* Cleanliness */}
        <div className="border-r border-[#EBEBEB] pr-4">
          <div className="text-xs font-semibold text-[#222222]">Cleanliness</div>
          <div className="text-lg font-bold text-[#222222] my-1">{ratings.cleanliness.toFixed(1)}</div>
          <Sparkles className="w-5 h-5 text-[#222222] mx-auto md:mx-0" />
        </div>

        {/* Accuracy */}
        <div className="border-r border-[#EBEBEB] pr-4">
          <div className="text-xs font-semibold text-[#222222]">Accuracy</div>
          <div className="text-lg font-bold text-[#222222] my-1">{ratings.accuracy.toFixed(1)}</div>
          <CheckCircle className="w-5 h-5 text-[#222222] mx-auto md:mx-0" />
        </div>

        {/* Check-in */}
        <div className="border-r border-[#EBEBEB] pr-4">
          <div className="text-xs font-semibold text-[#222222]">Check-in</div>
          <div className="text-lg font-bold text-[#222222] my-1">{ratings.checkIn.toFixed(1)}</div>
          <Key className="w-5 h-5 text-[#222222] mx-auto md:mx-0" />
        </div>

        {/* Communication */}
        <div className="border-r border-[#EBEBEB] pr-4">
          <div className="text-xs font-semibold text-[#222222]">Communication</div>
          <div className="text-lg font-bold text-[#222222] my-1">{ratings.communication.toFixed(1)}</div>
          <MessageSquare className="w-5 h-5 text-[#222222] mx-auto md:mx-0" />
        </div>

        {/* Location */}
        <div className="border-r border-[#EBEBEB] pr-4">
          <div className="text-xs font-semibold text-[#222222]">Location</div>
          <div className="text-lg font-bold text-[#222222] my-1">{ratings.location.toFixed(1)}</div>
          <MapPin className="w-5 h-5 text-[#222222] mx-auto md:mx-0" />
        </div>

        {/* Value */}
        <div>
          <div className="text-xs font-semibold text-[#222222]">Value</div>
          <div className="text-lg font-bold text-[#222222] my-1">{ratings.value.toFixed(1)}</div>
          <Tag className="w-5 h-5 text-[#222222] mx-auto md:mx-0" />
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {reviews.map((rev) => (
          <div key={rev.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${rev.authorBgColor || 'bg-gray-200 text-gray-700'}`}>
                {rev.authorInitial || rev.authorName[0]}
              </div>
              <div>
                <h4 className="text-base font-semibold text-[#222222]">{rev.authorName}</h4>
                <p className="text-xs text-[#717171]">{rev.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-[#222222]">
              {Array.from({ length: Math.floor(rev.rating) }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current text-black" />
              ))}
            </div>

            <p className="text-sm text-[#222222] leading-relaxed line-clamp-3">{rev.content}</p>
          </div>
        ))}
      </div>

      {/* Show All Reviews Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-xl border border-[#222222] text-[#222222] font-semibold text-base hover:bg-gray-50 transition-all active:scale-95"
      >
        Show all {reviewCount} reviews
      </button>

      {/* Show All Reviews Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="All guest reviews"
            className="bg-white w-full max-w-3xl rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-modal relative animate-slide-up"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close reviews modal"
              className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-[#222222]" />
            </button>

            <h3 className="text-2xl font-bold text-[#222222] mt-8 mb-6">
              ★ {rating.toFixed(2)} · {reviewCount} reviews
            </h3>

            <div className="space-y-8">
              {reviews.map((rev) => (
                <div key={`modal-${rev.id}`} className="border-b border-[#EBEBEB] pb-6 last:border-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rev.authorBgColor || 'bg-gray-200'}`}>
                      {rev.authorInitial || rev.authorName[0]}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-[#222222]">{rev.authorName}</h4>
                      <p className="text-xs text-[#717171]">{rev.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#222222] leading-relaxed mt-2">{rev.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
