import React from 'react';
import { ChevronLeft, Upload, Heart } from 'lucide-react';
import { ListingData } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useKeyboardNav } from '../hooks/useKeyboardNav';

interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ListingData['images'];
  onSelectPhoto: (index: number) => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}

// Group images by category for the tour layout
interface PhotoGroup {
  category: string;
  description?: string;
  images: Array<ListingData['images'][number] & { originalIndex: number }>;
}

function groupImagesByCategory(images: ListingData['images']): PhotoGroup[] {
  const groups: Record<string, PhotoGroup> = {};
  const order: string[] = [];

  images.forEach((img, idx) => {
    const cat = img.category ?? 'Additional photos';
    if (!groups[cat]) {
      groups[cat] = { category: cat, images: [] };
      order.push(cat);
    }
    groups[cat].images.push({ ...img, originalIndex: idx });
  });

  return order.map((cat) => groups[cat]);
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  onClose,
  images,
  onSelectPhoto,
  isSaved,
  onToggleSave,
  onShare,
}) => {
  useLockBodyScroll(isOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);
  useKeyboardNav({ onEscape: onClose, enabled: isOpen });

  if (!isOpen) return null;

  const groups = groupImagesByCategory(images);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fade-in">
      {/* Sticky Top Header Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#EBEBEB] px-6 lg:px-12 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          aria-label="Back to listing"
          className="p-2.5 rounded-full hover:bg-gray-100 text-[#222222] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* "Photo tour" title centered */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-[#FF385C] underline underline-offset-2">
          Photo tour
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={onShare}
            aria-label="Share photo tour"
            className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors underline"
          >
            <Upload className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={onToggleSave}
            aria-label="Save listing"
            className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors underline"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Two-column Photo Gallery Content */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Photo Tour Gallery"
        className="max-w-[960px] mx-auto px-6 lg:px-8 py-10"
      >
        {groups.map((group, groupIdx) => (
          <div
            key={`${group.category}-${groupIdx}`}
            className="flex gap-10 mb-16 border-b border-[#EBEBEB] pb-16 last:border-none last:pb-0"
          >
            {/* Left Column: Category Label */}
            <div className="w-[220px] shrink-0 pt-1">
              <h2 className="text-2xl font-bold text-[#222222] leading-tight">{group.category}</h2>
              {group.description && (
                <p className="text-sm text-[#717171] mt-2 leading-relaxed">{group.description}</p>
              )}
            </div>

            {/* Right Column: Photo Grid */}
            <div className="flex-1 space-y-3">
              {group.images.map((img, photoIdx) => {
                // First photo is full-width; subsequent photos pair up as 2-column rows
                if (photoIdx === 0) {
                  return (
                    <div
                      key={img.id}
                      className="w-full cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                      onClick={() => onSelectPhoto(img.originalIndex)}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-[360px] object-cover hover:scale-[1.01] transition-transform duration-300"
                      />
                    </div>
                  );
                }

                // Pair subsequent photos in 2-column grid rows
                if (photoIdx % 2 === 1) {
                  const nextImg = group.images[photoIdx + 1];
                  return (
                    <div key={img.id} className="grid grid-cols-2 gap-3">
                      <div
                        className="cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                        onClick={() => onSelectPhoto(img.originalIndex)}
                      >
                        <img
                          src={img.url}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-[240px] object-cover hover:scale-[1.01] transition-transform duration-300"
                        />
                      </div>
                      {nextImg && (
                        <div
                          className="cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                          onClick={() => onSelectPhoto(nextImg.originalIndex)}
                        >
                          <img
                            src={nextImg.url}
                            alt={nextImg.alt}
                            loading="lazy"
                            className="w-full h-[240px] object-cover hover:scale-[1.01] transition-transform duration-300"
                          />
                        </div>
                      )}
                    </div>
                  );
                }

                return null; // Even indexes after 0 are handled by the previous odd-index render
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
