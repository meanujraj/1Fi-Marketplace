export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
}

export interface StorageVariant {
  id: string;
  label: string;
  ram?: string;
  priceDelta: number; // additional cost relative to base price
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRatePercent: number;
  processingFee: number;
  isNoCost: boolean;
  tag?: string;
}

export interface ProductSpecification {
  display: string;
  processor: string;
  camera: string;
  battery: string;
}

export interface TechnicalDetails {
  os: string;
  cellularTechnology: string;
  chargingVoltage: string;
  inTheBox: string;
  weight: string;
  dimensions: string;
  connectivity: string;
  warranty: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  exactModel?: string;
  asin?: string;
  sourceUrl?: string;
  startingEmi: number;
  startingEmiLabel?: string;
  tagline: string;
  basePrice: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  category: 'Smartphones' | 'Laptops' | 'Audio' | 'Wearables';
  images: any[];
  colors: ColorVariant[];
  storageOptions: StorageVariant[];
  specifications: ProductSpecification;
  technicalDetails?: TechnicalDetails;
  aboutThisItem?: string[];
  emiPlans: EmiPlan[];
  inStock: boolean;
}

export type RootScreen = 
  | { name: 'Shop' }
  | { name: 'TopBrands' }
  | { name: 'NearbyStores' }
  | { name: 'Marketplace' }
  | { name: 'ProductDetails'; productId: string };

export type BottomTab = 'home' | 'shop' | 'portfolio' | 'account' | 'profile';
