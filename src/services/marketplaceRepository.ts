import { MOCK_PRODUCTS } from '../data/mockProducts';
import { Product, EmiPlan } from '../types';

const ALLOWED_CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables'];

export class MarketplaceRepository {
  private shouldSimulateError = false;

  public setSimulateError(value: boolean) {
    this.shouldSimulateError = value;
  }

  public getSimulateError(): boolean {
    return this.shouldSimulateError;
  }

  // Sanitize search inputs to prevent malformed queries or injection
  private sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    return input.slice(0, 100).replace(/[^\w\s\-\+\.\(\)]/gi, '').trim();
  }

  // Fetch all products with input validation and simulated network latency
  public async getProducts(rawSearchQuery = '', rawCategory = 'All'): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (this.shouldSimulateError) {
      throw new Error('Unable to connect to 1Fi Marketplace server. Please try again.');
    }

    const searchQuery = this.sanitizeInput(rawSearchQuery).toLowerCase();
    const category = ALLOWED_CATEGORIES.includes(rawCategory) ? rawCategory : 'All';

    let filtered = [...MOCK_PRODUCTS];

    if (category !== 'All') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (searchQuery.length > 0) {
      filtered = filtered.filter((p) => {
        const inBasic =
          p.name.toLowerCase().includes(searchQuery) ||
          p.brand.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery) ||
          (p.exactModel && p.exactModel.toLowerCase().includes(searchQuery)) ||
          (p.asin && p.asin.toLowerCase().includes(searchQuery));

        const inColors = p.colors?.some((c) => c.name.toLowerCase().includes(searchQuery));
        const inStorage = p.storageOptions?.some(
          (s) =>
            s.label.toLowerCase().includes(searchQuery) ||
            (s.ram && s.ram.toLowerCase().includes(searchQuery))
        );

        return inBasic || inColors || inStorage;
      });
    }

    return filtered;
  }

  // Fetch single product by id with safe identifier check
  public async getProductById(rawId: string): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    if (this.shouldSimulateError) {
      throw new Error('Could not load product details. Please try again.');
    }

    const id = this.sanitizeInput(rawId);
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found or invalid request.');
    }
    return product;
  }

  // Dynamically recalculate EMI plans with input bounds validation
  public calculateEmiForPrice(rawPrice: number, basePlans: EmiPlan[]): EmiPlan[] {
    // Security check: validate price is a positive finite number
    const price = typeof rawPrice === 'number' && Number.isFinite(rawPrice) && rawPrice > 0
      ? Math.round(rawPrice)
      : 0;

    if (price === 0) return [];

    return basePlans.map((plan) => {
      let monthly: number;
      if (plan.isNoCost || plan.interestRatePercent === 0) {
        monthly = Math.round(price / plan.tenureMonths);
      } else {
        const monthlyRate = plan.interestRatePercent / 12 / 100;
        const n = plan.tenureMonths;
        // Standard EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
        const emi = (price * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        monthly = Math.round(emi);
      }
      return {
        ...plan,
        monthlyAmount: monthly,
      };
    });
  }
}

export const marketplaceRepository = new MarketplaceRepository();
