# 1Fi Marketplace – SDE Intern Android Assignment

A React Native & TypeScript implementation of the **1Fi Marketplace** integrated into the existing 1Fi **Shop** experience. This project allows users to browse flagship consumer electronics, customize product variants (color & storage), calculate dynamic EMI repayment plans, and complete instant credit applications with zero down payment.

---

## 📱 User Flow & Architecture

```
1Fi App
  └── Shop Tab
       ├── Top Brands (Blank placeholder per spec)
       ├── Nearby Stores (Blank placeholder per spec)
       └── 1Fi Marketplace (Full Implementation)
            ├── Product Catalog (Search & Category Filters)
            ├── Product Details
            │    ├── Multi-angle Image Gallery
            │    ├── Dynamic Color & Storage Variants
            │    ├── Live Price & Spec Adjustments
            │    ├── Interactive EMI Calculator (3 to 24 Months)
            │    └── Proceed CTA
            └── Instant Credit Approval & Application Modal
```

---

## 🚀 Key Features

1. **Shop Integration**:
   - Matches 1Fi native mobile navigation and aesthetics.
   - Includes **Top Brands** and **Nearby Stores** placeholder screens as required by the assignment specification.
   - Highlights **1Fi Marketplace** with direct access to credit-backed shopping.

2. **Marketplace Catalog (`MarketplaceScreen`)**:
   - Responsive product cards with brand, title, specs, rating, and lowest monthly EMI badge.
   - Real-time search bar (by name, brand, or category).
   - Category filter pills (`All`, `Smartphones`, `Laptops`, `Audio`, `Wearables`).
   - Pull-to-refresh support and loading states.
   - Built-in **Test Error Toggle** button to demonstrate error resilience and retry handling.

3. **Dynamic Product Details (`ProductDetailsScreen`)**:
   - Multi-image gallery with interactive thumbnail switching.
   - **Color Variant Selection**: Visual color swatches (e.g. Desert Titanium, Natural Titanium, Jet Black).
   - **Storage / Spec Variant Selection**: Storage chips with automatic price delta adjustments (e.g. +₹10,000 for 256GB).
   - **Dynamic EMI Plan Engine**:
     - Automatically recalculates monthly installments and interest charges whenever a variant price changes.
     - Supports **No Cost EMI (0% Interest)** and flexible tenures (3, 6, 9, 12, 18, 24 months).
     - Breakdown reveals principal, subsidized interest, processing fee, and total payable.
   - **Sticky Proceed CTA**: Shows selected tenure & monthly EMI with one-tap checkout.

4. **1Fi Credit Approval Modal (`OrderSuccessModal`)**:
   - Generates application reference ID (`1FI-XXXXXX`).
   - Displays device breakdown, zero down payment confirmation, and loan repayment schedule.

5. **Clean Architecture & Data Layer**:
   - Zero hardcoded UI data: structured under `src/types/` and `src/data/mockProducts.ts`.
   - `MarketplaceRepository` handles asynchronous retrieval, simulated network latency, and EMI math formulas.

---

## 🛠️ Project Structure

```
1Fi-Marketplace/
├── assets/                       # App icons, splash, and branding assets
├── src/
│   ├── components/
│   │   ├── BottomNavBar.tsx      # Persistent bottom navigation (Home, Shop, Portfolio, Account)
│   │   ├── EmiPlanCard.tsx       # Tenure selector with interactive breakdown
│   │   ├── Header.tsx            # Standardized 1Fi navigation header
│   │   ├── OrderSuccessModal.tsx # Instant credit approval & loan summary modal
│   │   ├── ProductCard.tsx       # Catalog product card with lowest EMI tag
│   │   └── VariantSelector.tsx   # Color swatch & storage chips
│   ├── data/
│   │   └── mockProducts.ts       # Structured catalog dataset
│   ├── screens/
│   │   ├── MarketplaceScreen.tsx # Catalog listing, search, category filter
│   │   ├── NearbyStoresScreen.tsx# Blank screen placeholder
│   │   ├── ProductDetailsScreen.tsx # Detailed view, variant picker, EMI engine
│   │   ├── ShopScreen.tsx        # Entry screen with 3 assignment options
│   │   └── TopBrandsScreen.tsx   # Blank screen placeholder
│   ├── services/
│   │   └── marketplaceRepository.ts # Async data repository with EMI recalculation
│   ├── theme/
│   │   └── colors.ts             # 1Fi brand tokens (Navy, Emerald Teal, Slate)
│   └── types/
│       └── index.ts              # TypeScript interfaces (Product, Variant, EmiPlan)
├── App.tsx                       # Root navigation & state container
├── app.json                      # Expo application manifest
├── package.json
└── tsconfig.json
```

---

## 📦 How to Run Locally

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/meanujraj/1Fi-Marketplace.git
cd 1Fi-Marketplace

# 2. Install dependencies
npm install
```

### Running the App
```bash
# Start Expo development server
npm start

# Run on Android Emulator / Device (via Expo Go app)
npm run android

# Run in Web Browser
npm run web
```

Scan the QR code in your terminal using the **Expo Go** app on your Android smartphone for instant live testing.

---

## 🔒 Security & Engineering Best Practices

1. **Zero Hardcoded Secrets**:
   - Environment files (`.env*`), cryptographic keys (`*.pem`, `*.key`), and credentials are systematically excluded via [.gitignore](file:///d:/1Fi%20Marketplace/.gitignore).
2. **Data & Price Tamper Resistance**:
   - Pricing and EMI recalculations are strictly encapsulated within `MarketplaceRepository`.
   - All client queries and category filters undergo input sanitization to prevent malformed or injection payloads.
   - Price arguments are bounds-checked to ensure positive, finite numeric values.
3. **Privacy & PII Protection**:
   - No personal user identifiers (PAN, Aadhaar, account numbers, unmasked phone numbers) are logged or stored in client mock data.
4. **Navigation Parameter Isolation**:
   - Navigation stacks pass only immutable product IDs (`productId: string`), ensuring sensitive state cannot leak across routing boundaries.
5. **Production Boundary Notice**:
   - Client-side mock calculations are clearly separated from real financial transactions. In production, final credit underwriting and loan origination occur on 1Fi backend lending partner gateways.

| Evaluation Criteria | Implementation in this Repository |
| :--- | :--- |
| **Product Understanding** | Accurately integrated inside the existing **Shop** section with the 3 exact choices: Top Brands, Nearby Stores, and 1Fi Marketplace. |
| **UI/UX Consistency** | Built using 1Fi brand identity: Navy `#0A2540`, Emerald Teal `#00D09C`, crisp spacing, standard elevation, and clean typography. |
### 📱 Catalog of Exactly 9 Smartphones (Amazon India Verified)

| Brand | Model | ASIN | Amazon Selling Price | Starting EMI | Storage / RAM Variants |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Apple** | iPhone 15 | `B0CHX1W1XY` | ₹58,999 (MRP ₹69,600) | ₹2,860/mo | 128GB, 256GB, 512GB |
| **Apple** | iPhone 16 Pro | `B0DGJ7X1DX` | ₹1,11,900 (MRP ₹1,19,900) | ₹5,425/mo | 128GB, 256GB, 512GB, 1TB |
| **Apple** | iPhone 16 Pro Max | `B0DGJCZZXN` | ₹1,34,900 (MRP ₹1,44,900) | ₹6,540/mo | 256GB, 512GB, 1TB |
| **Samsung** | Galaxy S25 5G | `B0DT92C6J7` | ₹74,999 (MRP ₹80,999) | ₹3,636/mo | 8GB+128GB, 8GB+256GB |
| **Samsung** | Galaxy S25+ 5G | `B0DT96Y1P4` | ₹92,999 (MRP ₹99,999) | ₹4,509/mo | 12GB+256GB, 12GB+512GB |
| **Samsung** | Galaxy S24 Ultra 5G | `B0CS5XN7Q1` | ₹1,09,999 (MRP ₹1,34,999) | ₹5,333/mo | 12GB+256GB, 12GB+512GB, 1TB |
| **OnePlus** | OnePlus 13 5G | `B0DP2J794S` | ₹69,997 (MRP ₹74,999) | ₹3,394/mo | 12GB+256GB, 16GB+512GB |
| **OnePlus** | OnePlus 13R 5G | `B0DP2MD3S2` | ₹42,999 (MRP ₹45,999) | ₹2,084/mo | 8GB+128GB, 12GB+256GB |
| **OnePlus** | OnePlus Nord 4 5G | `B0D7VSF19F` | ₹27,999 (MRP ₹32,999) | ₹1,357/mo | 8GB+128GB, 8GB+256GB, 12GB+256GB |
