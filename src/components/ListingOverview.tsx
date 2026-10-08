import React from 'react';
import { Host, ListingData } from '../types';
import { Key, Laptop, MapPin, Tag } from 'lucide-react';

interface ListingOverviewProps {
  specs: ListingData['specs'];
  location: ListingData['location'];
  host: Host;
  highlights: ListingData['highlights'];
  discountBadge?: ListingData['discountBadge'];
}

export const ListingOverview: React.FC<ListingOverviewProps> = ({
  specs,
  location,
  host,
  highlights,
  discountBadge,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Key':
        return <Key className="w-6 h-6 text-[#222222]" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-[#222222]" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-[#222222]" />;
      default:
        return <Key className="w-6 h-6 text-[#222222]" />;
    }
  };

  return (
    <div className="py-6 border-b border-[#EBEBEB]">
      {/* Title & Subtitle Specs */}
      <h2 className="text-[22px] font-semibold text-[#222222]">
        {specs.propertyType} in {location.city}, {location.country}
      </h2>
      <p className="text-base text-[#222222] mt-1">
        {specs.maxGuests} guests · {specs.bedrooms} bedroom · {specs.beds} bed · {specs.bathrooms} bathroom
      </p>

      {/* Host Avatar Block */}
      <div className="flex items-center gap-4 py-6 my-6 border-y border-[#EBEBEB]">
        <img
          src={host.avatar}
          alt={host.name}
          className="w-14 h-14 rounded-full object-cover border border-black/10"
        />
        <div>
          <h3 className="text-base font-semibold text-[#222222]">Hosted by {host.name}</h3>
          <p className="text-sm text-[#717171]">
            {host.isSuperhost ? 'Superhost · ' : ''}
            {host.yearsHosting} Years hosting
          </p>
        </div>
      </div>

      {/* Special Highlights List */}
      <div className="space-y-6">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex gap-6 items-start">
            <div className="mt-0.5 shrink-0">{getIcon(item.iconName)}</div>
            <div>
              <h4 className="text-base font-semibold text-[#222222]">{item.title}</h4>
              <p className="text-sm text-[#717171] mt-0.5">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 10% Discount Promo Banner Card */}
      {discountBadge && (
        <div className="mt-8 p-4 rounded-2xl border border-[#DDDDDD] bg-[#F7F7F7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-[#FF385C]" />
            <span className="text-sm font-medium text-[#222222]">{discountBadge.text}</span>
          </div>
          <button className="text-sm font-semibold text-[#222222] px-4 py-2 bg-white rounded-lg border border-[#DDDDDD] hover:bg-gray-50 transition-colors shadow-sm">
            Claim
          </button>
        </div>
      )}
    </div>
  );
};
