import { useState, useEffect, useMemo, useCallback } from 'react';
import { listingData } from './data/listing';
import { BookingState } from './types';
import { useScrollSpy } from './hooks/useScrollSpy';
import { calculateNights } from './utils/formatters';
import { Navbar } from './components/Navbar';
import { HeaderTitle } from './components/HeaderTitle';
import { HeroGrid } from './components/HeroGrid';
import { ListingOverview } from './components/ListingOverview';
import { Description } from './components/Description';
import { SleepingArrangements } from './components/SleepingArrangements';
import { Amenities } from './components/Amenities';
import { CalendarSection } from './components/CalendarSection';
import { BookingCard } from './components/BookingCard';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HostDetails } from './components/HostDetails';
import { ThingsToKnow } from './components/ThingsToKnow';
import { NearbyStays } from './components/NearbyStays';
import { Footer } from './components/Footer';
import { PhotoTourModal } from './components/PhotoTourModal';
import { LightboxModal } from './components/LightboxModal';
import { ShareModal } from './components/ShareModal';

export function App() {
  // LocalStorage state initialization
  const [isSaved, setIsSaved] = useState<boolean>(() => {
    return localStorage.getItem('airbnb_clone_saved') === 'true';
  });

  const [bookingState, setBookingState] = useState<BookingState>(() => {
    const cached = localStorage.getItem('airbnb_clone_booking');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // fallback
      }
    }
    return {
      checkInDate: '2026-10-18',
      checkOutDate: '2026-10-23',
      guests: { adults: 2, children: 0, infants: 0, pets: 0 },
    };
  });

  // Modal view states
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Persist saved state to localStorage
  useEffect(() => {
    localStorage.setItem('airbnb_clone_saved', String(isSaved));
  }, [isSaved]);

  // Persist booking state to localStorage
  useEffect(() => {
    localStorage.setItem('airbnb_clone_booking', JSON.stringify(bookingState));
  }, [bookingState]);

  // ScrollSpy section tracking
  const activeSection = useScrollSpy(['photos', 'amenities', 'reviews', 'location'], 120);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleToggleSave = useCallback(() => {
    setIsSaved((prev) => !prev);
  }, []);

  const handleUpdateBooking = useCallback((updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleSelectDates = useCallback((checkIn: string | null, checkOut: string | null) => {
    setBookingState((prev) => ({
      ...prev,
      checkInDate: checkIn,
      checkOutDate: checkOut,
    }));
  }, []);

  const handleOpenPhotoTour = useCallback((index: number = 0) => {
    setLightboxIndex(index);
    setIsPhotoTourOpen(true);
  }, []);

  const handleOpenLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const totalNights = useMemo(() => {
    return calculateNights(bookingState.checkInDate, bookingState.checkOutDate);
  }, [bookingState.checkInDate, bookingState.checkOutDate]);

  const basePriceTotal = useMemo(() => {
    return listingData.nightlyPrice * totalNights;
  }, [totalNights]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#222222]">
      {/* Sticky Main Navigation */}
      <Navbar
        onReserveClick={() => handleNavigateSection('photos')}
        nightlyPrice={listingData.nightlyPrice}
        totalPrice={basePriceTotal}
        totalNights={totalNights}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Page Layout Container */}
      <main className="max-w-[1120px] mx-auto px-6 lg:px-12 flex-1 w-full">
        {/* Title Row */}
        <HeaderTitle
          title={listingData.title}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onShare={() => setIsShareModalOpen(true)}
        />

        {/* Hero Photo Grid */}
        <HeroGrid
          images={listingData.images}
          onOpenPhotoTour={handleOpenPhotoTour}
        />

        {/* Main Two-Column Layout (Left Content ~2/3, Right Sticky Booking Card ~1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-6">
          {/* Left Column Content */}
          <div className="lg:col-span-2 space-y-2">
            <ListingOverview
              specs={listingData.specs}
              location={listingData.location}
              host={listingData.host}
              highlights={listingData.highlights}
              discountBadge={listingData.discountBadge}
            />

            <Description description={listingData.description} />

            <SleepingArrangements arrangements={listingData.sleepingArrangements} />

            <Amenities amenities={listingData.amenities} />

            <CalendarSection
              checkInDate={bookingState.checkInDate}
              checkOutDate={bookingState.checkOutDate}
              onSelectDates={handleSelectDates}
              city={listingData.location.neighborhood}
            />
          </div>

          {/* Right Column Sticky Booking Card */}
          <div className="lg:col-span-1">
            <BookingCard
              nightlyPrice={listingData.nightlyPrice}
              maxGuests={listingData.specs.maxGuests}
              bookingState={bookingState}
              onChangeBooking={handleUpdateBooking}
            />
          </div>
        </div>

        {/* Full-width Sections */}
        <ReviewsSection
          rating={listingData.rating}
          reviewCount={listingData.reviewCount}
          ratings={listingData.ratings}
          reviews={listingData.reviews}
        />

        <LocationSection location={listingData.location} />

        <HostDetails
          host={listingData.host}
          rating={listingData.rating}
          reviewCount={listingData.reviewCount}
        />

        <ThingsToKnow
          cancellationPolicy={listingData.cancellationPolicy}
          houseRules={listingData.houseRules}
          safety={listingData.safety}
        />

        <NearbyStays properties={listingData.nearbyStays} />
      </main>

      {/* Footer */}
      <Footer />

      {/* VIEW 2: Photo Tour Modal */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        onClose={() => setIsPhotoTourOpen(false)}
        images={listingData.images}
        onSelectPhoto={(idx) => handleOpenLightbox(idx)}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={() => setIsShareModalOpen(true)}
      />

      {/* VIEW 3: Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        currentIndex={lightboxIndex}
        images={listingData.images}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* Share Link Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={listingData.title}
      />
    </div>
  );
}

export default App;
