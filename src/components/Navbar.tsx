import React, { useState, useEffect } from 'react';
import { Search, Globe, Menu, User, Star } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface NavbarProps {
  onReserveClick: () => void;
  nightlyPrice: number;
  totalPrice: number;
  totalNights: number;
  rating: number;
  reviewCount: number;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReserveClick,
  totalPrice,
  totalNights,
  rating,
  reviewCount,
  activeSection,
  onNavigateSection,
}) => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky section bar after scrolling past ~550px (hero grid height)
      if (window.scrollY > 520) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Main Top Header */}
      <div className="border-b border-[#EBEBEB] px-6 lg:px-12 py-4 transition-all duration-200">
        <div className="max-w-[1120px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-[#FF385C] focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg"
            aria-label="Airbnb homepage"
          >
            <svg
              className="h-8 w-auto fill-current"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.608-3.262 7.806-7.5 7.806-3.325 0-6.046-2.029-7.1-4.769l-.4-.958-.4.958c-1.054 2.74-3.775 4.769-7.1 4.769-4.238 0-7.5-3.198-7.5-7.806 0-.924.243-1.805.91-3.396l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.316.634-3.385 2.544l-.43.824C10.279 10.12 6.166 18.736 5.2 21.001l-.113.275c-.538 1.282-.736 1.93-.772 2.576l-.009.248c0 3.473 2.378 5.9 5.5 5.9 2.525 0 4.67-1.614 5.4-3.8l.3-1.05.5.001.5-.001.3 1.05c.73 2.186 2.875 3.8 5.4 3.8 3.122 0 5.5-2.427 5.5-5.9 0-.646-.198-1.294-.772-2.576l-.113-.275c-.966-2.265-5.079-10.881-6.985-14.633l-.43-.824C18.316 3.634 17.239 3 16 3zm0 14c2.209 0 4 1.791 4 4 0 2.247-1.42 4.161-3.4 4.8l-.6.18-1-.18C13.42 25.161 12 23.247 12 21c0-2.209 1.791-4 4-4zm0 2c-1.105 0-2 .895-2 2 0 1.031.78 1.88 1.783 1.987l.217.013c1.031 0 1.88-.78 1.987-1.783l.013-.217c0-1.105-.895-2-2-2z" />
            </svg>
            <span className="text-xl font-bold tracking-tight hidden sm:inline">airbnb</span>
          </a>

          {/* Search Capsule Pill */}
          <div className="flex items-center border border-[#DDDDDD] rounded-full py-2 px-4 shadow-pill hover:shadow-pill-hover cursor-pointer transition-shadow duration-200">
            <button className="text-sm font-semibold px-3 border-r border-[#EBEBEB] text-[#222222]">
              Anywhere
            </button>
            <button className="text-sm font-semibold px-3 border-r border-[#EBEBEB] text-[#222222]">
              Anytime
            </button>
            <button className="text-sm text-[#717171] pl-3 pr-2 flex items-center gap-3">
              <span>Add guests</span>
              <span className="bg-[#FF385C] text-white p-2 rounded-full flex items-center justify-center">
                <Search className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </button>
          </div>

          {/* Right Menu & Profile */}
          <div className="flex items-center gap-2">
            <button className="text-sm font-semibold hover:bg-[#F7F7F7] px-4 py-2.5 rounded-full transition-colors hidden md:block">
              Become a host
            </button>
            <button
              aria-label="Choose a language and currency"
              className="p-3 hover:bg-[#F7F7F7] rounded-full text-[#222222] transition-colors"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              aria-label="Main navigation menu"
              className="flex items-center gap-3 border border-[#DDDDDD] rounded-full py-1.5 px-3 hover:shadow-pill-hover transition-shadow bg-white"
            >
              <Menu className="w-4 h-4 text-[#222222]" />
              <div className="bg-[#717171] text-white rounded-full p-1">
                <User className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Header Navigation Bar (Appears on Scroll) */}
      {isScrolledPastHero && (
        <div className="border-b border-[#EBEBEB] bg-white animate-fade-in shadow-nav">
          <div className="max-w-[1120px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
            {/* Tabs */}
            <nav aria-label="Listing sections" className="flex items-center gap-8 h-full">
              {[
                { id: 'photos', label: 'Photos' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'location', label: 'Location' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onNavigateSection(tab.id)}
                  className={`h-full flex items-center text-sm font-semibold border-b-2 transition-colors ${
                    activeSection === tab.id
                      ? 'border-[#222222] text-[#222222]'
                      : 'border-transparent text-[#717171] hover:text-[#222222]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Quick Reserve Widget */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-[#222222]">
                  {formatCurrency(totalPrice)} <span className="font-normal text-xs text-[#717171]">for {totalNights} nights</span>
                </div>
                <div className="flex items-center justify-end gap-1 text-xs text-[#222222]">
                  <Star className="w-3 h-3 fill-current text-black" />
                  <span className="font-semibold">{rating.toFixed(2)}</span>
                  <span className="text-[#717171]">· {reviewCount} reviews</span>
                </div>
              </div>
              <button
                onClick={onReserveClick}
                className="bg-gradient-to-r from-[#E51D53] to-[#D70466] hover:opacity-95 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-transform active:scale-95 shadow-sm"
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
