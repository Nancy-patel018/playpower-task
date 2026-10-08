import React from 'react';
import { SleepingArrangement } from '../types';

interface SleepingArrangementsProps {
  arrangements: SleepingArrangement[];
}

export const SleepingArrangements: React.FC<SleepingArrangementsProps> = ({ arrangements }) => {
  return (
    <div className="py-8 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-6">Where you'll sleep</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {arrangements.map((item) => (
          <div
            key={item.id}
            className="border border-[#DDDDDD] rounded-xl overflow-hidden p-4 flex flex-col justify-between"
          >
            <div className="w-full h-40 rounded-lg overflow-hidden mb-4 bg-gray-100">
              <img
                src={item.image}
                alt={item.roomName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#222222]">{item.roomName}</h4>
              <p className="text-sm text-[#717171] mt-1">{item.bedsDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
