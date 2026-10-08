import React, { useState } from 'react';
import { Calendar, Key, Shield, ChevronRight, X } from 'lucide-react';
import { HouseRules, SafetyProperty, CancellationPolicy } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ThingsToKnowProps {
  cancellationPolicy: CancellationPolicy;
  houseRules: HouseRules;
  safety: SafetyProperty;
}

export const ThingsToKnow: React.FC<ThingsToKnowProps> = ({
  cancellationPolicy,
  houseRules,
  safety,
}) => {
  const [activeModal, setActiveModal] = useState<'policy' | 'rules' | 'safety' | null>(null);

  useLockBodyScroll(activeModal !== null);
  const modalRef = useFocusTrap<HTMLDivElement>(activeModal !== null);

  return (
    <div className="py-12 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-8">Things to know</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cancellation policy */}
        <div>
          <div className="mb-4">
            <Calendar className="w-6 h-6 text-[#222222]" />
          </div>
          <h4 className="text-base font-semibold text-[#222222] mb-2">Cancellation policy</h4>
          <p className="text-sm text-[#222222] leading-relaxed mb-2">
            {cancellationPolicy.summary}
          </p>
          <p className="text-xs text-[#717171] mb-3">{cancellationPolicy.details}</p>
          <button
            onClick={() => setActiveModal('policy')}
            className="font-semibold text-sm text-[#222222] underline underline-offset-4 flex items-center gap-1 hover:text-black"
          >
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* House rules */}
        <div>
          <div className="mb-4">
            <Key className="w-6 h-6 text-[#222222]" />
          </div>
          <h4 className="text-base font-semibold text-[#222222] mb-2">House rules</h4>
          <ul className="text-sm text-[#222222] space-y-2 mb-3">
            <li>{houseRules.checkIn}</li>
            <li>{houseRules.checkOut}</li>
            <li>{houseRules.maxGuests} guests maximum</li>
          </ul>
          <button
            onClick={() => setActiveModal('rules')}
            className="font-semibold text-sm text-[#222222] underline underline-offset-4 flex items-center gap-1 hover:text-black"
          >
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Safety & property */}
        <div>
          <div className="mb-4">
            <Shield className="w-6 h-6 text-[#222222]" />
          </div>
          <h4 className="text-base font-semibold text-[#222222] mb-2">Safety & property</h4>
          <ul className="text-sm text-[#222222] space-y-2 mb-3">
            {safety.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <button
            onClick={() => setActiveModal('safety')}
            className="font-semibold text-sm text-[#222222] underline underline-offset-4 flex items-center gap-1 hover:text-black"
          >
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Things to know detail"
            className="bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-modal relative animate-slide-up"
          >
            <button
              onClick={() => setActiveModal(null)}
              aria-label="Close modal"
              className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-[#222222]" />
            </button>

            <h3 className="text-2xl font-bold text-[#222222] mt-6 mb-4 capitalize">
              {activeModal === 'policy' && 'Cancellation Policy'}
              {activeModal === 'rules' && 'House Rules'}
              {activeModal === 'safety' && 'Safety & Property'}
            </h3>

            {activeModal === 'policy' && (
              <div className="text-sm text-[#222222] space-y-3 leading-relaxed">
                <p>{cancellationPolicy.summary}</p>
                <p>Full refund if cancelled at least 48 hours prior to check-in. Partial refund applies after that timeline according to host agreement terms.</p>
              </div>
            )}

            {activeModal === 'rules' && (
              <div className="text-sm text-[#222222] space-y-3">
                <p>• {houseRules.checkIn}</p>
                <p>• {houseRules.checkOut}</p>
                <p>• Maximum {houseRules.maxGuests} guests allowed</p>
                {houseRules.additionalRules?.map((rule, i) => (
                  <p key={i}>• {rule}</p>
                ))}
              </div>
            )}

            {activeModal === 'safety' && (
              <div className="text-sm text-[#222222] space-y-3">
                {safety.items.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
