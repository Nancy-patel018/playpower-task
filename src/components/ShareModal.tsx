import React, { useState } from 'react';
import { X, Copy, Check, Share2, Mail, MessageCircle } from 'lucide-react';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title }) => {
  const [copied, setCopied] = useState(false);

  useLockBodyScroll(isOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Share this listing"
        className="bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-modal relative animate-slide-up"
      >
        <button
          onClick={onClose}
          aria-label="Close share modal"
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-[#222222]" />
        </button>

        <h3 className="text-2xl font-bold text-[#222222] mt-6 mb-2">Share this place</h3>
        <p className="text-sm text-[#717171] mb-6 line-clamp-1">{title}</p>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 border border-[#DDDDDD] rounded-xl p-2 mb-6 bg-[#F7F7F7]">
          <input
            type="text"
            readOnly
            value={window.location.href}
            className="flex-1 text-xs text-[#717171] bg-transparent outline-none px-2 truncate"
          />
          <button
            onClick={handleCopyLink}
            className="bg-[#222222] hover:bg-black text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy link</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Social Options */}
        <div className="grid grid-cols-2 gap-3 text-sm font-medium text-[#222222]">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 p-3 rounded-xl border border-[#DDDDDD] hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-5 h-5 text-[#FF385C]" />
            <span>Copy Link</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 p-3 rounded-xl border border-[#DDDDDD] hover:bg-gray-50 transition-colors"
          >
            <Mail className="w-5 h-5 text-blue-500" />
            <span>Email</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 p-3 rounded-xl border border-[#DDDDDD] hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald-500" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
