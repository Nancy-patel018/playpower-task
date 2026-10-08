import React from 'react';
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';
import { calculateNights, formatDateDisplay } from '../utils/formatters';

interface CalendarSectionProps {
  checkInDate: string | null;
  checkOutDate: string | null;
  onSelectDates: (checkIn: string | null, checkOut: string | null) => void;
  city: string;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  checkInDate,
  checkOutDate,
  onSelectDates,
  city,
}) => {
  const nights = calculateNights(checkInDate, checkOutDate);

  // October 2026 (Days in month: 31, 1st Oct is Thursday -> offset 4)
  const oct2026Days = Array.from({ length: 31 }, (_, i) => i + 1);
  const octOffset = 4; // Thursday

  // November 2026 (Days in month: 30, 1st Nov is Sunday -> offset 0)
  const nov2026Days = Array.from({ length: 30 }, (_, i) => i + 1);
  const novOffset = 0;

  const isSelected = (dayStr: string) => {
    return dayStr === checkInDate || dayStr === checkOutDate;
  };

  const isInRange = (dayStr: string) => {
    if (!checkInDate || !checkOutDate) return false;
    return dayStr > checkInDate && dayStr < checkOutDate;
  };

  const handleDateClick = (dayStr: string) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      onSelectDates(dayStr, null);
    } else {
      if (dayStr > checkInDate) {
        onSelectDates(checkInDate, dayStr);
      } else {
        onSelectDates(dayStr, null);
      }
    }
  };

  return (
    <div className="py-8 border-b border-[#EBEBEB]">
      {/* Header Title */}
      <h3 className="text-[22px] font-semibold text-[#222222]">
        {checkInDate && checkOutDate ? `${nights} nights in ${city}` : 'Select dates'}
      </h3>
      <p className="text-sm text-[#717171] mt-1 mb-6">
        {checkInDate && checkOutDate
          ? `${formatDateDisplay(checkInDate)} - ${formatDateDisplay(checkOutDate)}`
          : 'Add your travel dates for exact pricing'}
      </p>

      {/* Dual Month Calendar Container */}
      <div className="flex flex-col lg:flex-row gap-12 justify-between">
        {/* October 2026 */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 rounded-full hover:bg-gray-100 text-[#222222]" aria-label="Previous month">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h4 className="text-base font-semibold text-[#222222]">October 2026</h4>
            <div className="w-8" />
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#717171] mb-2">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-medium text-[#222222]">
            {Array.from({ length: octOffset }).map((_, idx) => (
              <div key={`oct-empty-${idx}`} />
            ))}
            {oct2026Days.map((day) => {
              const dayStr = `2026-10-${String(day).padStart(2, '0')}`;
              const selected = isSelected(dayStr);
              const ranged = isInRange(dayStr);
              return (
                <button
                  key={`oct-${day}`}
                  onClick={() => handleDateClick(dayStr)}
                  className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center transition-all ${
                    selected
                      ? 'bg-[#222222] text-white font-bold shadow-md'
                      : ranged
                      ? 'bg-gray-100 text-[#222222] rounded-none'
                      : 'hover:bg-gray-100 text-[#222222]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* November 2026 */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8" />
            <h4 className="text-base font-semibold text-[#222222]">November 2026</h4>
            <button className="p-2 rounded-full hover:bg-gray-100 text-[#222222]" aria-label="Next month">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#717171] mb-2">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-medium text-[#222222]">
            {Array.from({ length: novOffset }).map((_, idx) => (
              <div key={`nov-empty-${idx}`} />
            ))}
            {nov2026Days.map((day) => {
              const dayStr = `2026-11-${String(day).padStart(2, '0')}`;
              const selected = isSelected(dayStr);
              const ranged = isInRange(dayStr);
              return (
                <button
                  key={`nov-${day}`}
                  onClick={() => handleDateClick(dayStr)}
                  className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center transition-all ${
                    selected
                      ? 'bg-[#222222] text-white font-bold shadow-md'
                      : ranged
                      ? 'bg-gray-100 text-[#222222] rounded-none'
                      : 'hover:bg-gray-100 text-[#222222]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Controls: Keyboard Icon + Clear Dates */}
      <div className="flex items-center justify-between mt-6 pt-4">
        <button
          aria-label="Keyboard shortcuts"
          className="p-2 rounded-lg hover:bg-gray-100 text-[#222222] transition-colors"
        >
          <Keyboard className="w-5 h-5" />
        </button>
        <button
          onClick={() => onSelectDates(null, null)}
          className="text-sm font-semibold text-[#222222] underline underline-offset-4 hover:text-black"
        >
          Clear dates
        </button>
      </div>
    </div>
  );
};
