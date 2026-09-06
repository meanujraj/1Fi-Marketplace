import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { ProductCard } from '../components/ProductCard';
import { Colors } from '../theme/colors';

interface ShopScreenProps {
  onNavigateToMarketplace: () => void;
  onSelectProduct: (productId: string) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  onNavigateToMarketplace,
  onSelectProduct,
}) => {
  // Default to 'marketplace' so the pill starts at position 2 (rightmost)
  const [activeTab, setActiveTab] = useState<'topBrands' | 'nearbyStores' | 'marketplace'>('marketplace');
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const tabAnim = useRef(new Animated.Value(2)).current;

  const handleTabPress = (tab: 'topBrands' | 'nearbyStores' | 'marketplace', index: number) => {
    setActiveTab(tab);
    Animated.timing(tabAnim, {
      toValue: index,
      duration: 180,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };

  const tabWidth = containerWidth > 8 ? (containerWidth - 8) / 3 : 0;
  const translateX = tabAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, tabWidth, tabWidth * 2],
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Hero Banner matching official 1Fi App */}
        <View style={styles.heroSection}>
          <Image
            source={require('../../assets/banners/hero-banner.webp')}
            style={styles.heroBannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Floating Capsule Tabs Bar matching 1Fi App & Website */}
        <View style={styles.tabContainerWrapper}>
          <View
            style={styles.segmentedContainer}
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          >
            {containerWidth > 8 && (
              <Animated.View
                style={[
                  styles.slidingPill,
                  {
                    width: tabWidth,
                    transform: [{ translateX }],
                  },
                ]}
              >
                <View style={styles.activeUnderline} />
              </Animated.View>
            )}

            <TouchableOpacity
              style={styles.segmentTab}
              onPress={() => handleTabPress('topBrands', 0)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'topBrands' && styles.segmentTextActive,
                ]}
              >
                Top Brands
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.segmentTab}
              onPress={() => handleTabPress('nearbyStores', 1)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'nearbyStores' && styles.segmentTextActive,
                ]}
              >
                Nearby Stores
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.segmentTab}
              onPress={() => handleTabPress('marketplace', 2)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'marketplace' && styles.segmentTextActive,
                ]}
              >
                Marketplace
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── TOP BRANDS ── Blank placeholder per assignment spec */}
        {activeTab === 'topBrands' && (
          <View style={styles.placeholderSection}>
            <View style={styles.placeholderIconCircle}>
              <Ionicons name="ribbon-outline" size={40} color={Colors.textMuted} />
            </View>
            <Text style={styles.placeholderTitle}>Top Brands</Text>
            <Text style={styles.placeholderSubtitle}>
              This section is a placeholder per assignment specification.
            </Text>
          </View>
        )}

        {/* ── NEARBY STORES ── Blank placeholder per assignment spec */}
        {activeTab === 'nearbyStores' && (
          <View style={styles.placeholderSection}>
            <View style={styles.placeholderIconCircle}>
              <Ionicons name="location-outline" size={40} color={Colors.textMuted} />
            </View>
            <Text style={styles.placeholderTitle}>Nearby Stores</Text>
            <Text style={styles.placeholderSubtitle}>
              This section is a placeholder per assignment specification.
            </Text>
          </View>
        )}

        {/* ── MARKETPLACE ── Entry card + 3-product preview; full catalog in MarketplaceScreen */}
        {activeTab === 'marketplace' && (
          <View style={styles.tabSection}>
            {/* Hero CTA card – tapping navigates to full MarketplaceScreen */}
            <TouchableOpacity
              style={styles.marketplaceHeroCard}
              onPress={onNavigateToMarketplace}
              activeOpacity={0.88}
            >
              <View style={styles.verifiedRow}>
                <Ionicons name="shield-checkmark" size={13} color={Colors.primary} />
                <Text style={styles.verifiedText}>1FI VERIFIED PRODUCTS</Text>
              </View>
              <Text style={styles.marketplaceHeroTitle}>1Fi Marketplace</Text>
              <Text style={styles.marketplaceHeroSub}>
                Zero down payment with flexible tenures.{'\n'}EMI from ₹1,357/mo backed by your mutual funds.
              </Text>
              <View style={styles.marketplaceBadgeRow}>
                <View style={styles.marketplaceBadge}>
                  <Ionicons name="flash-outline" size={13} color={Colors.tealDark} />
                  <Text style={styles.marketplaceBadgeText}>0% Interest Available</Text>
                </View>
                <View style={styles.marketplaceBadge}>
                  <Ionicons name="checkmark-circle-outline" size={13} color={Colors.tealDark} />
                  <Text style={styles.marketplaceBadgeText}>Instant Approval</Text>
                </View>
              </View>
              <View style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Explore Marketplace</Text>
                <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {/* Quick 3-product preview */}
            <View style={styles.previewHeaderRow}>
              <Text style={styles.sectionHeaderTitle}>Featured Picks</Text>
              <TouchableOpacity onPress={onNavigateToMarketplace}>
                <Text style={styles.seeAllText}>View all →</Text>
              </TouchableOpacity>
            </View>

            {MOCK_PRODUCTS.slice(0, 3).map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onPress={() => onSelectProduct(prod.id)}
              />
            ))}

            {/* View-all footer button */}
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={onNavigateToMarketplace}
              activeOpacity={0.85}
            >
              <Text style={styles.viewAllButtonText}>View All Products</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },

  // Hero banner
  heroSection: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#4C1D95',
    shadowColor: 'rgba(91, 33, 182, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  heroBannerImage: {
    width: '100%',
    height: 195,
  },

  // Segmented tab bar
  tabContainerWrapper: {
    paddingHorizontal: 16,
    marginTop: -20,
    zIndex: 10,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F0FF',
    borderRadius: 9999,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ECE5FF',
    shadowColor: 'rgba(113, 44, 220, 0.10)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  slidingPill: {
    position: 'absolute',
    left: 4,
    top: 4,
    bottom: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    shadowColor: 'rgba(20, 14, 50, 0.12)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(113, 44, 220, 0.10)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 4,
  },
  activeUnderline: {
    width: 22,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#712CDC',
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    zIndex: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: -0.1,
  },
  segmentTextActive: {
    color: '#712CDC',
    fontWeight: '700',
  },

  // Placeholder tabs (Top Brands & Nearby Stores) – blank per spec
  placeholderSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  placeholderIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  placeholderSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },

  // Marketplace tab
  tabSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  marketplaceHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#D7DCFA',
    marginBottom: 20,
    shadowColor: 'rgba(113, 44, 220, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  marketplaceHeroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  marketplaceHeroSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 14,
    lineHeight: 19,
  },
  marketplaceBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  marketplaceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.tealLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  marketplaceBadgeText: {
    fontSize: 11,
    color: Colors.tealDark,
    fontWeight: '700',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  previewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    marginTop: 4,
    marginBottom: 8,
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});
