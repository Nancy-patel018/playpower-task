export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  responseRate: string;
  responseTime: string;
  bio?: string;
  coHosts?: Array<{
    name: string;
    avatar?: string;
    initial: string;
    bgClass: string;
  }>;
  school?: string;
  birthDecade?: string;
}

export interface ReviewCategoryRatings {
  overall: number;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorInitial?: string;
  authorBgColor?: string;
  rating: number;
  date: string;
  content: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'popular' | 'bathroom' | 'bedroom' | 'entertainment' | 'family' | 'heating_cooling' | 'safety' | 'internet' | 'kitchen' | 'outdoor' | 'parking';
  iconName: string;
}

export interface SleepingArrangement {
  id: string;
  roomName: string;
  bedsDescription: string;
  image: string;
}

export interface NearbyProperty {
  id: string;
  title: string;
  pricePerNight: number;
  totalPriceForStay: number;
  rating: number;
  image: string;
}

export interface HouseRules {
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  additionalRules?: string[];
}

export interface SafetyProperty {
  items: string[];
}

export interface CancellationPolicy {
  summary: string;
  details: string;
}

export interface ListingData {
  id: string;
  title: string;
  location: {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
    neighborhoodHighlights: string;
  };
  rating: number;
  reviewCount: number;
  nightlyPrice: number;
  discountBadge?: {
    percentage: number;
    text: string;
  };
  specs: {
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    propertyType: string;
  };
  images: Array<{
    id: string;
    url: string;
    alt: string;
    caption?: string;
    category?: string;
  }>;
  host: Host;
  highlights: Array<{
    title: string;
    subtitle: string;
    iconName: string;
  }>;
  description: string;
  sleepingArrangements: SleepingArrangement[];
  amenities: Amenity[];
  ratings: ReviewCategoryRatings;
  reviews: Review[];
  houseRules: HouseRules;
  safety: SafetyProperty;
  cancellationPolicy: CancellationPolicy;
  nearbyStays: NearbyProperty[];
}

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface BookingState {
  checkInDate: string | null; // ISO format 'YYYY-MM-DD'
  checkOutDate: string | null;
  guests: GuestCounts;
}
