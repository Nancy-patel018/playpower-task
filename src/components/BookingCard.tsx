import React, { useState, useRef } from 'react';
import { ChevronDown, Flag, Plus, Minus, X, Check } from 'lucide-react';
import { BookingState, GuestCounts } from '../types';
import { formatCurrency, calculateNights, formatDateDisplay } from '../utils/formatters';
import { useClickOutside } from '../hooks/useClickOutside';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface BookingCardProps {
  nightlyPrice: number;
  maxGuests: number;
  bookingState: BookingState;
  onChangeBooking: (updates: Partial<BookingState>) => void;
  onOpenCalendarModal?: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  nightlyPrice,
  maxGuests,
  bookingState,
  onChangeBooking,
}) => {
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsGuestDropdownOpen(false));

  useLockBodyScroll(isReserveModalOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isReserveModalOpen);

  const nights = calculateNights(bookingState.checkInDate, bookingState.checkOutDate);
  const basePriceTotal = nightlyPrice * nights;
  const cleaningFee = 1200;
  const serviceFee = 3200;
  const grandTotal = basePriceTotal + cleaningFee + serviceFee;

  const totalGuestsCount = bookingState.guests.adults + bookingState.guests.children;

  const updateGuests = (category: keyof GuestCounts, delta: number) => {
    const current = bookingState.guests[category];
    const nextVal = current + delta;
    if (nextVal < 0) return;

    if (category === 'adults' && nextVal < 1) return; // Min 1 adult

    if ((category === 'adults' || category === 'children') && delta > 0) {
      if (totalGuestsCount >= maxGuests) return; // Max guest limit
    }

    const updated = {
      ...bookingState.guests,
      [category]: nextVal,
    };
    onChangeBooking({ guests: updated });
  };

  const handleReserveClick = () => {
    setIsReserveModalOpen(true);
    setReservationConfirmed(false);
  };

  const handleConfirmReservation = () => {
    setReservationConfirmed(true);
  };

  return (
    <div className="sticky top-28 z-30">
      <div className="border border-[#DDDDDD] rounded-2xl p-6 shadow-card bg-white">
        {/* Price Header */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-[22px] font-bold text-[#222222]">
              {formatCurrency(basePriceTotal)}
            </span>
            <span className="text-base text-[#717171] font-normal ml-1">for {nights} nights</span>
          </div>
        </div>

        {/* Date & Guests Input Box */}
        <div className="border border-[#B0B0B0] rounded-xl overflow-hidden mb-4">
          {/* Dates Row */}
          <div className="grid grid-cols-2 border-b border-[#B0B0B0]">
            <div className="p-3 border-r border-[#B0B0B0] cursor-pointer hover:bg-gray-50">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                CHECK-IN
              </label>
              <input
                type="text"
                readOnly
                value={formatDateDisplay(bookingState.checkInDate, 'slash')}
                className="w-full text-xs font-normal text-[#222222] bg-transparent cursor-pointer outline-none"
              />
            </div>

            <div className="p-3 cursor-pointer hover:bg-gray-50">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                CHECKOUT
              </label>
              <input
                type="text"
                readOnly
                value={formatDateDisplay(bookingState.checkOutDate, 'slash')}
                className="w-full text-xs font-normal text-[#222222] bg-transparent cursor-pointer outline-none"
              />
            </div>
          </div>

          {/* Guests Row */}
          <div ref={dropdownRef} className="relative p-3 cursor-pointer hover:bg-gray-50">
            <div
              onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
              className="flex items-center justify-between"
            >
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                  GUESTS
                </label>
                <span className="text-sm text-[#222222] font-normal">
                  {totalGuestsCount} {totalGuestsCount === 1 ? 'guest' : 'guests'}
                  {bookingState.guests.infants > 0 && `, ${bookingState.guests.infants} infant`}
                  {bookingState.guests.pets > 0 && `, ${bookingState.guests.pets} pet`}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#222222] transition-transform duration-200 ${
                  isGuestDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* Guests Popover Dropdown */}
            {isGuestDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DDDDDD] rounded-2xl p-4 shadow-modal z-50 animate-fade-in space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#222222]">Adults</div>
                    <div className="text-xs text-[#717171]">Age 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateGuests('adults', -1)}
                      disabled={bookingState.guests.adults <= 1}
                      aria-label="Decrease adults"
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-[#222222] w-4 text-center">
                      {bookingState.guests.adults}
                    </span>
                    <button
                      onClick={() => updateGuests('adults', 1)}
                      disabled={totalGuestsCount >= maxGuests}
                      aria-label="Increase adults"
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#222222]">Children</div>
                    <div className="text-xs text-[#717171]">Ages 2–12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateGuests('children', -1)}
                      disabled={bookingState.guests.children <= 0}
                      aria-label="Decrease children"
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-[#222222] w-4 text-center">
                      {bookingState.guests.children}
                    </span>
                    <button
                      onClick={() => updateGuests('children', 1)}
                      disabled={totalGuestsCount >= maxGuests}
                      aria-label="Increase children"
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#222222]">Infants</div>
                    <div className="text-xs text-[#717171]">Under 2</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateGuests('infants', -1)}
                      disabled={bookingState.guests.infants <= 0}
                      aria-label="Decrease infants"
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-[#222222] w-4 text-center">
                      {bookingState.guests.infants}
                    </span>
                    <button
                      onClick={() => updateGuests('infants', 1)}
                      aria-label="Increase infants"
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-black hover:text-black"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Pets */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#222222]">Pets</div>
                    <div className="text-xs text-[#717171]">Service animals allowed</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateGuests('pets', -1)}
                      disabled={bookingState.guests.pets <= 0}
                      aria-label="Decrease pets"
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-[#222222] w-4 text-center">
                      {bookingState.guests.pets}
                    </span>
                    <button
                      onClick={() => updateGuests('pets', 1)}
                      aria-label="Increase pets"
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-black hover:text-black"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-[#717171] pt-2 border-t border-[#EBEBEB]">
                  This place has a maximum of {maxGuests} guests, not including infants.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Free Cancellation Notice */}
        <div className="bg-[#F7F7F7] p-3 rounded-xl text-center text-xs font-medium text-[#222222] mb-4">
          Free cancellation before 17 October
        </div>

        {/* Reserve Button */}
        <button
          onClick={handleReserveClick}
          className="w-full bg-gradient-to-r from-[#E51D53] to-[#D70466] hover:opacity-95 text-white font-semibold text-base py-3.5 rounded-xl transition-transform active:scale-[0.98] shadow-sm mb-3"
        >
          Reserve
        </button>

        <p className="text-center text-xs text-[#717171] mb-6">You won't be charged yet</p>

        {/* Live Price Calculation Breakdown */}
        <div className="space-y-3 text-sm text-[#222222] border-t border-[#EBEBEB] pt-6">
          <div className="flex justify-between">
            <span className="underline">{formatCurrency(nightlyPrice)} x {nights} nights</span>
            <span>{formatCurrency(basePriceTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>{formatCurrency(cleaningFee)}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Airbnb service fee</span>
            <span>{formatCurrency(serviceFee)}</span>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between text-base font-bold text-[#222222] border-t border-[#EBEBEB] pt-4 mt-4">
          <span>Total before taxes</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {/* Report listing button */}
      <div className="mt-4 text-center">
        <button className="text-xs font-semibold text-[#717171] hover:text-black flex items-center gap-2 mx-auto underline">
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>

      {/* Reserve Flow Modal */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm Reservation"
            className="bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-modal relative animate-slide-up"
          >
            <button
              onClick={() => setIsReserveModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-[#222222]" />
            </button>

            {!reservationConfirmed ? (
              <div>
                <h3 className="text-2xl font-bold text-[#222222] mt-6 mb-2">Request to book</h3>
                <p className="text-sm text-[#717171] mb-6">Review your reservation details</p>

                <div className="bg-[#F7F7F7] p-4 rounded-xl space-y-3 mb-6 text-sm text-[#222222]">
                  <div className="flex justify-between border-b border-[#EBEBEB] pb-2">
                    <span className="font-medium">Dates</span>
                    <span>{formatDateDisplay(bookingState.checkInDate)} – {formatDateDisplay(bookingState.checkOutDate)} ({nights} nights)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EBEBEB] pb-2">
                    <span className="font-medium">Guests</span>
                    <span>{totalGuestsCount} guests</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-1">
                    <span>Total cost</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmReservation}
                  className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white font-semibold text-base py-3.5 rounded-xl transition-all shadow-md"
                >
                  Confirm and Book
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-heart-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold text-[#222222] mb-2">Reservation Confirmed!</h3>
                <p className="text-sm text-[#717171] mb-6">
                  Your stay at Romantic Jacuzzi 1BHK Candolim is saved in your local session.
                </p>
                <button
                  onClick={() => setIsReserveModalOpen(false)}
                  className="px-8 py-3 bg-[#222222] text-white font-semibold text-sm rounded-xl hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
