import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { VariantSelector } from '../components/VariantSelector';
import { EmiPlanCard } from '../components/EmiPlanCard';
import { OrderSuccessModal } from '../components/OrderSuccessModal';
import { Product, ColorVariant, StorageVariant, EmiPlan } from '../types';
import { marketplaceRepository } from '../services/marketplaceRepository';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface ProductDetailsScreenProps {
  productId: string;
  onBack: () => void;
  onOrderSuccessReturn: () => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  productId,
  onBack,
  onOrderSuccessReturn,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // User selections
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageVariant | null>(null);
  const [calculatedEmiPlans, setCalculatedEmiPlans] = useState<EmiPlan[]>([]);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EmiPlan | null>(null);

  // Success modal
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await marketplaceRepository.getProductById(productId);
        setProduct(data);
        setSelectedColor(data.colors[0]);
        setSelectedStorage(data.storageOptions[0]);

        const basePrice = data.basePrice + data.storageOptions[0].priceDelta;
        const dynamicPlans = marketplaceRepository.calculateEmiForPrice(basePrice, data.emiPlans);
        setCalculatedEmiPlans(dynamicPlans);
        setSelectedEmiPlan(dynamicPlans[0]);
      } catch (err: any) {
        setError(err.message || 'Error loading product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [productId]);

  // Recalculate price and EMI plans when storage variant changes
  const handleSelectStorage = (storage: StorageVariant) => {
    setSelectedStorage(storage);
    if (product) {
      const newPrice = product.basePrice + storage.priceDelta;
      const newPlans = marketplaceRepository.calculateEmiForPrice(newPrice, product.emiPlans);
      setCalculatedEmiPlans(newPlans);

      // Preserve previously selected tenure index if possible
      if (selectedEmiPlan) {
        const matchingPlan = newPlans.find((p) => p.tenureMonths === selectedEmiPlan.tenureMonths);
        setSelectedEmiPlan(matchingPlan || newPlans[0]);
      } else {
        setSelectedEmiPlan(newPlans[0]);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Product Details" onBack={onBack} />
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={Colors.tealDark} />
          <Text style={styles.loadingText}>Fetching product & EMI details...</Text>
        </View>
      </View>
    );
  }

  if (error || !product || !selectedColor || !selectedStorage || !selectedEmiPlan) {
    return (
      <View style={styles.container}>
        <Header title="Product Details" onBack={onBack} />
        <View style={styles.centerBox}>
          <Ionicons name="alert-circle-outline" size={44} color={Colors.danger} />
          <Text style={styles.errorText}>{error || 'Product not found'}</Text>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backBtnText}>Back to Catalog</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const finalPrice = product.basePrice + selectedStorage.priceDelta;

  return (
    <View style={styles.container}>
      {/* Header with Wishlist action */}
      <Header
        title={product.brand}
        subtitle={product.name}
        onBack={onBack}
        rightAction={
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={() => setIsWishlisted(!isWishlisted)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={isWishlisted ? Colors.danger : Colors.textSecondary}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Product Image Carousel */}
        <View style={styles.imageHeroContainer}>
          <Image
            source={
              typeof product.images[selectedImageIndex] === 'string'
                ? { uri: product.images[selectedImageIndex] }
                : product.images[selectedImageIndex]
            }
            style={styles.mainImage}
            resizeMode="contain"
          />

          {/* Thumbnail Selectors */}
          {product.images.length > 1 && (
            <View style={styles.thumbnailsRow}>
              {product.images.map((imgUrl, index) => {
                const isSelected = selectedImageIndex === index;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedImageIndex(index)}
                    style={[
                      styles.thumbBox,
                      isSelected && styles.thumbBoxSelected,
                    ]}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={typeof imgUrl === 'string' ? { uri: imgUrl } : imgUrl}
                      style={styles.thumbImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Product Basic Info */}
        <View style={styles.card}>
          <View style={styles.brandRow}>
            <Text style={styles.brandLabel}>{product.brand}</Text>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
              <Text style={styles.reviewsText}>({product.reviewCount} reviews)</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.tagline}>{product.tagline}</Text>

          {/* Pricing Row */}
          <View style={styles.pricingRow}>
            <Text style={styles.finalPrice}>₹{finalPrice.toLocaleString('en-IN')}</Text>
            {product.originalPrice > product.basePrice && (
              <Text style={styles.strikethroughPrice}>
                ₹{(product.originalPrice + selectedStorage.priceDelta).toLocaleString('en-IN')}
              </Text>
            )}
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>
                {product.discountPercent}% OFF • Zero Down
              </Text>
            </View>
          </View>

          <View style={styles.emiHighlightRow}>
            <Ionicons name="shield-checkmark" size={16} color={Colors.tealDark} />
            <Text style={styles.emiHighlightText}>
              Pre-approved credit line: No credit card required
            </Text>
          </View>

          {product.asin && (
            <View style={styles.amazonSourceRow}>
              <Ionicons name="cart-outline" size={14} color={Colors.primary} />
              <Text style={styles.amazonSourceText}>
                Amazon India ASIN: {product.asin} • Genuine Verified Specs
              </Text>
            </View>
          )}
        </View>

        {/* Variant Selection (Colors & Storage) */}
        <View style={styles.card}>
          <VariantSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            storageOptions={product.storageOptions}
            selectedStorage={selectedStorage}
            onSelectStorage={handleSelectStorage}
          />
        </View>

        {/* Technical Specifications (Amazon Overview) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Device Specifications</Text>
          <View style={styles.specGrid}>
            <View style={styles.specItem}>
              <Ionicons name="tv-outline" size={18} color={Colors.primary} />
              <Text style={styles.specLabel}>Display</Text>
              <Text style={styles.specVal}>{product.specifications.display}</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="hardware-chip-outline" size={18} color={Colors.primary} />
              <Text style={styles.specLabel}>Processor</Text>
              <Text style={styles.specVal}>{product.specifications.processor}</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="camera-outline" size={18} color={Colors.primary} />
              <Text style={styles.specLabel}>Camera</Text>
              <Text style={styles.specVal}>{product.specifications.camera}</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="battery-charging-outline" size={18} color={Colors.primary} />
              <Text style={styles.specLabel}>Battery & Voltage</Text>
              <Text style={styles.specVal}>{product.specifications.battery}</Text>
            </View>
          </View>
        </View>

        {/* About this item (Amazon India Product Highlights) */}
        {product.aboutThisItem && product.aboutThisItem.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>About this item</Text>
            <View style={styles.aboutList}>
              {product.aboutThisItem.map((bullet, idx) => (
                <View key={idx} style={styles.aboutBulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.aboutBulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Full Amazon Technical Details Table */}
        {product.technicalDetails && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Technical Details</Text>
            <View style={styles.techTable}>
              <View style={styles.techRow}>
                <Text style={styles.techKey}>Operating System</Text>
                <Text style={styles.techVal}>{product.technicalDetails.os}</Text>
              </View>
              <View style={styles.techRowAlt}>
                <Text style={styles.techKey}>Cellular Tech</Text>
                <Text style={styles.techVal}>{product.technicalDetails.cellularTechnology}</Text>
              </View>
              <View style={styles.techRow}>
                <Text style={styles.techKey}>Charging & Voltage</Text>
                <Text style={styles.techVal}>{product.technicalDetails.chargingVoltage}</Text>
              </View>
              <View style={styles.techRowAlt}>
                <Text style={styles.techKey}>In The Box</Text>
                <Text style={styles.techVal}>{product.technicalDetails.inTheBox}</Text>
              </View>
              <View style={styles.techRow}>
                <Text style={styles.techKey}>Item Weight</Text>
                <Text style={styles.techVal}>{product.technicalDetails.weight}</Text>
              </View>
              <View style={styles.techRowAlt}>
                <Text style={styles.techKey}>Dimensions</Text>
                <Text style={styles.techVal}>{product.technicalDetails.dimensions}</Text>
              </View>
              <View style={styles.techRow}>
                <Text style={styles.techKey}>Connectivity</Text>
                <Text style={styles.techVal}>{product.technicalDetails.connectivity}</Text>
              </View>
              <View style={styles.techRowAlt}>
                <Text style={styles.techKey}>Warranty</Text>
                <Text style={styles.techVal}>{product.technicalDetails.warranty}</Text>
              </View>
            </View>
          </View>
        )}

        {/* EMI Plans Section */}
        <View style={styles.card}>
          <View style={styles.emiSectionHeader}>
            <View>
              <Text style={styles.cardTitle}>Choose EMI Tenure</Text>
              <Text style={styles.emiSubhead}>Select plan matching your budget</Text>
            </View>
            <View style={styles.zeroDownTag}>
              <Text style={styles.zeroDownTagText}>₹0 Down Payment</Text>
            </View>
          </View>

          {calculatedEmiPlans.map((plan) => (
            <EmiPlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedEmiPlan.id === plan.id}
              onSelect={setSelectedEmiPlan}
              totalPrice={finalPrice}
            />
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar (Assignment Core CTA) */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarInfo}>
          <Text style={styles.bottomEmiLabel}>Selected EMI:</Text>
          <View style={styles.bottomPriceRow}>
            <Text style={styles.bottomEmiPrice}>
              ₹{selectedEmiPlan.monthlyAmount.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.bottomTenureText}>
              /mo ({selectedEmiPlan.tenureMonths} mos)
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => setIsSuccessModalVisible(true)}
          activeOpacity={0.88}
        >
          <Text style={styles.proceedButtonText}>Proceed with EMI</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Order & Loan Approval Modal */}
      <OrderSuccessModal
        visible={isSuccessModalVisible}
        onClose={() => {
          setIsSuccessModalVisible(false);
          onOrderSuccessReturn();
        }}
        product={product}
        selectedColor={selectedColor}
        selectedStorage={selectedStorage}
        selectedEmiPlan={selectedEmiPlan}
        finalPrice={finalPrice}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: 15,
    color: Colors.danger,
    marginTop: 10,
    marginBottom: 16,
  },
  backBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  wishlistBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHeroContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 0.8,
    borderColor: '#E4E4E7',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  mainImage: {
    width: width - 64,
    height: 220,
  },
  thumbnailsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  thumbBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  thumbBoxSelected: {
    borderColor: Colors.primary,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 0.8,
    borderColor: '#E4E4E7',
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  reviewsText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  finalPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  strikethroughPrice: {
    fontSize: 14,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  saveBadge: {
    backgroundColor: '#F5F0FF',
    borderWidth: 0.8,
    borderColor: '#ECE5FF',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  saveBadgeText: {
    color: '#5C22A5',
    fontSize: 11,
    fontWeight: '700',
  },
  emiHighlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tealLight,
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },
  emiHighlightText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
    flex: 1,
  },
  amazonSourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF0FD',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    gap: 6,
  },
  amazonSourceText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 10,
  },
  specGrid: {
    gap: 10,
  },
  specItem: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  specVal: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  aboutList: {
    gap: 10,
  },
  aboutBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  aboutBulletText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  techTable: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  techRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  techRowAlt: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  techKey: {
    width: 120,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  techVal: {
    flex: 1,
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  emiSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  emiSubhead: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: -6,
  },
  zeroDownTag: {
    backgroundColor: Colors.tealLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#B3F0E0',
  },
  zeroDownTagText: {
    color: Colors.tealDark,
    fontSize: 11,
    fontWeight: '800',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomBarInfo: {
    flex: 1,
  },
  bottomEmiLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  bottomEmiPrice: {
    fontSize: 19,
    fontWeight: '800',
    color: '#712CDC',
  },
  bottomTenureText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  proceedButton: {
    backgroundColor: '#712CDC',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
