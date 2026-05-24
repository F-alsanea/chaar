export interface Property {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  price?: number;
  area: number;
  floors: number;
  bathrooms: number;
  rooms: number;
  images: string[];
  featuredImage: string;
  licenseNumber: string;
  type: 'villa' | 'apartment' | 'duplex' | 'land' | 'commercial';
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  isNew?: boolean;
  isExclusive?: boolean;
  description?: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  licenseNumber: string;
  socialMedia: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  stats: {
    clients: number;
    companies: number;
    developers: number;
  };
}
