import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);

  useLockBodyScroll(isOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <div className="py-8 border-b border-[#EBEBEB]">
      {/* Translation Banner */}
      <div className="bg-[#F7F7F7] p-4 rounded-xl text-xs text-[#222222] mb-6">
        <span>Some info has been automatically translated. </span>
        <button className="font-semibold underline cursor-pointer hover:text-black">
          Show original
        </button>
      </div>

      {/* Description Snippet */}
      <div className="text-base leading-relaxed text-[#222222] whitespace-pre-line line-clamp-6">
        {description}
      </div>

      {/* Show More Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 font-semibold text-base text-[#222222] underline underline-offset-4 flex items-center gap-1 hover:text-black"
      >
        <span>Show more</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Full Description Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="About this space"
            className="bg-white w-full max-w-2xl rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-modal relative animate-slide-up"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close description modal"
              className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-[#222222]" />
            </button>

            <h3 className="text-2xl font-bold text-[#222222] mt-8 mb-6">About this space</h3>
            <div className="text-base leading-relaxed text-[#222222] space-y-4 whitespace-pre-line">
              {description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
