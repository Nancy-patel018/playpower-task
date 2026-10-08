import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7F7F7] border-t border-[#EBEBEB] text-[#222222]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-12 py-12">
        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#DDDDDD] text-sm">
          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#222222]">Support</h4>
            <ul className="space-y-2.5 text-[#717171]">
              <li><a href="#" className="hover:underline">Help Centre</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
              <li><a href="#" className="hover:underline">Report neighbourhood concern</a></li>
            </ul>
          </div>

          {/* Hosting */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#222222]">Hosting</h4>
            <ul className="space-y-2.5 text-[#717171]">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
              <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
              <li><a href="#" className="hover:underline">Join a free Hosting class</a></li>
            </ul>
          </div>

          {/* Airbnb */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#222222]">Airbnb</h4>
            <ul className="space-y-2.5 text-[#717171]">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#222222]">Community</h4>
            <ul className="space-y-2.5 text-[#717171]">
              <li><a href="#" className="hover:underline">Disaster relief housing</a></li>
              <li><a href="#" className="hover:underline">Combating discrimination</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-[#222222]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#717171]">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold text-sm">
            <button className="flex items-center gap-2 hover:underline">
              <Globe className="w-4 h-4" />
              <span>English (IN)</span>
            </button>
            <button className="hover:underline">₹ INR</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
