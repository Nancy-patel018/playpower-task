import React, { useState } from 'react';
import { ShieldCheck, School, Calendar, MessageSquare, X } from 'lucide-react';
import { Host } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface HostDetailsProps {
  host: Host;
  rating: number;
  reviewCount: number;
}

export const HostDetails: React.FC<HostDetailsProps> = ({ host, rating }) => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useLockBodyScroll(isMessageModalOpen);
  const modalRef = useFocusTrap<HTMLDivElement>(isMessageModalOpen);

  return (
    <div className="py-12 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-8">Meet your host</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Host Card Left */}
        <div className="bg-[#F7F7F7] p-8 rounded-3xl border border-[#DDDDDD] flex flex-col items-center text-center shadow-sm">
          <img
            src={host.avatar}
            alt={host.name}
            className="w-24 h-24 rounded-full object-cover shadow-md mb-4 border-2 border-white"
          />
          <h4 className="text-2xl font-bold text-[#222222]">{host.name}</h4>
          <p className="text-sm text-[#717171] font-medium mt-1">Host</p>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[#EBEBEB] w-full justify-center">
            <div>
              <div className="text-xs font-semibold text-[#717171]">Rating</div>
              <div className="text-xl font-bold text-[#222222] mt-1">{rating.toFixed(2)}</div>
            </div>
            <div className="h-8 w-px bg-[#DDDDDD]" />
            <div>
              <div className="text-xs font-semibold text-[#717171]">Hosting</div>
              <div className="text-xl font-bold text-[#222222] mt-1">{host.yearsHosting} Years</div>
            </div>
          </div>
        </div>

        {/* Host Info Middle & Right */}
        <div className="lg:col-span-2 space-y-6">
          {/* Birth & School details */}
          <div className="space-y-4 text-base text-[#222222]">
            {host.birthDecade && (
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-[#222222]" />
                <span>{host.birthDecade}</span>
              </div>
            )}
            {host.school && (
              <div className="flex items-center gap-4">
                <School className="w-5 h-5 text-[#222222]" />
                <span>Where I went to school: {host.school}</span>
              </div>
            )}
          </div>

          {/* Co-Hosts */}
          {host.coHosts && host.coHosts.length > 0 && (
            <div className="pt-4 border-t border-[#EBEBEB]">
              <h5 className="text-sm font-semibold text-[#717171] mb-3">Co-Hosts</h5>
              <div className="flex items-center gap-4">
                {host.coHosts.map((ch, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${ch.bgClass}`}>
                      {ch.initial}
                    </div>
                    <span className="text-sm font-medium text-[#222222]">{ch.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Response Metrics */}
          <div className="pt-4 border-t border-[#EBEBEB] space-y-2">
            <h5 className="text-base font-semibold text-[#222222]">Host details</h5>
            <p className="text-sm text-[#222222]">Response rate: {host.responseRate}</p>
            <p className="text-sm text-[#222222]">{host.responseTime}</p>
          </div>

          {/* Message Host Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsMessageModalOpen(true)}
              className="bg-[#F7F7F7] hover:bg-gray-200 text-[#222222] font-semibold text-sm px-6 py-3 rounded-xl border border-[#222222] transition-colors"
            >
              Message host
            </button>
          </div>

          {/* Payment Protection Disclaimer */}
          <div className="flex items-start gap-3 pt-6 border-t border-[#EBEBEB] text-xs text-[#717171]">
            <ShieldCheck className="w-6 h-6 text-[#717171] shrink-0 mt-0.5" />
            <p>
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>

      {/* Message Host Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Send message to host"
            className="bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-modal relative animate-slide-up"
          >
            <button
              onClick={() => setIsMessageModalOpen(false)}
              aria-label="Close message modal"
              className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-[#222222]" />
            </button>

            <h3 className="text-2xl font-bold text-[#222222] mt-6 mb-2">Message {host.name}</h3>
            <p className="text-sm text-[#717171] mb-6">Ask a question before booking your stay.</p>

            <textarea
              rows={4}
              placeholder="Hi Mirashya Homes, I have a question about..."
              className="w-full border border-[#DDDDDD] rounded-xl p-3 text-sm focus:border-black outline-none resize-none mb-4"
            />

            <button
              onClick={() => setIsMessageModalOpen(false)}
              className="w-full bg-[#222222] hover:bg-black text-white font-semibold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send message</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
