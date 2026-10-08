import React, { useState } from 'react';
import { Upload, Heart } from 'lucide-react';

interface HeaderTitleProps {
  title: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  isSaved,
  onToggleSave,
  onShare,
}) => {
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  const handleHeartClick = () => {
    setIsHeartAnimating(true);
    onToggleSave();
    setTimeout(() => setIsHeartAnimating(false), 400);
  };

  return (
    <div className="pt-6 pb-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <h1 className="text-[26px] leading-[30px] font-semibold text-[#222222] tracking-tight">
          {title}
        </h1>

        <div className="flex items-center gap-2 shrink-0">
          {/* Share button */}
          <button
            onClick={onShare}
            className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] px-3 py-2 rounded-lg transition-colors underline decoration-1 underline-offset-4"
          >
            <Upload className="w-4 h-4 stroke-[2]" />
            <span>Share</span>
          </button>

          {/* Save / Wishlist button */}
          <button
            onClick={handleHeartClick}
            className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] px-3 py-2 rounded-lg transition-colors underline decoration-1 underline-offset-4"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isHeartAnimating ? 'animate-heart-bounce' : ''
              } ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-[#222222] stroke-[2]'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
