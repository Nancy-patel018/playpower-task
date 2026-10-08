import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ListingData } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useKeyboardNav } from '../hooks/useKeyboardNav';

interface LightboxModalProps {
  isOpen: boolean;
  currentIndex: number;
  images: ListingData['images'];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  currentIndex,
  images,
  onClose,
  onNavigate,
}) => {
  useLockBodyScroll(isOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(images.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  };

  useKeyboardNav({
    onArrowLeft: handlePrev,
    onArrowRight: handleNext,
    onEscape: onClose,
    enabled: isOpen,
  });

  // Image Preloading for smooth transition
  useEffect(() => {
    if (!isOpen) return;

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    const img1 = new Image();
    img1.src = images[nextIndex].url;

    const img2 = new Image();
    img2.src = images[prevIndex].url;
  }, [currentIndex, images, isOpen]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentPhoto = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-8 animate-fade-in select-none">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between z-20 text-white">
        <button
          onClick={onClose}
          aria-label="Close photo viewer"
          className="p-3 rounded-full hover:bg-white/10 text-white transition-colors"
        >
          <X className="w-6 h-6 stroke-[2]" />
        </button>

        <div className="text-sm font-semibold tracking-wide">
          {currentIndex + 1} / {images.length}
        </div>

        <div className="w-10" />
      </div>

      {/* Main Image Stage */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo ${currentIndex + 1} of ${images.length}: ${currentPhoto.alt}`}
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
      >
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute left-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-transform active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Display Photo */}
        <img
          src={currentPhoto.url}
          alt={currentPhoto.alt}
          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-200"
        />

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-transform active:scale-95"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Caption Footer */}
      {currentPhoto.alt && (
        <div className="text-center text-sm font-medium text-white/80 max-w-xl mx-auto py-2">
          {currentPhoto.alt}
        </div>
      )}
    </div>
  );
};
