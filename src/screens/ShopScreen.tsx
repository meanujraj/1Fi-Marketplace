import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface ShopScreenProps {
  onNavigateToMarketplace: () => void;
  onSelectProduct: (productId: string) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  onNavigateToMarketplace,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'topBrands' | 'nearbyStores' | 'marketplace'>('marketplace');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Hero Banner matching official 1Fi App Screenshot */}
        <View style={styles.heroSection}>
          <View style={styles.pillBadge}>
            <Ionicons name="sparkles" size={12} color="#FFFFFF" />
            <Text style={styles.pillBadgeText}>NO-COST EMIs</Text>
          </View>

          <View style={styles.heroContentRow}>
            <View style={styles.heroTextCol}>
              <Text style={styles.heroHeading}>Shop today,{'\n'}Pay later using{'\n'}Mutual funds.</Text>
              <Text style={styles.heroSubheading}>
                No credit score required. No interest.{'\n'}Backed by your investments.
              </Text>
            </View>

            {/* Shopping Bag & Devices Graphic */}
            <View style={styles.heroGraphicBox}>
              <View style={styles.bagContainer}>
                <Ionicons name="bag" size={46} color="#FFD700" />
                <View style={styles.carBadge}>
                  <Ionicons name="car-sport" size={14} color="#FFFFFF" />
                </View>
              </View>
            </View>
          </View>

          {/* Segmented Pill Tabs Bar matching 1Fi App Screenshot 2 & 5 */}
          <View style={styles.segmentedContainer}>
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'topBrands' && styles.segmentTabActive,
              ]}
              onPress={() => setActiveTab('topBrands')}
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
              {activeTab === 'topBrands' && <View style={styles.activeUnderline} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'nearbyStores' && styles.segmentTabActive,
              ]}
              onPress={() => setActiveTab('nearbyStores')}
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
              {activeTab === 'nearbyStores' && <View style={styles.activeUnderline} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'marketplace' && styles.segmentTabActive,
              ]}
              onPress={() => setActiveTab('marketplace')}
              activeOpacity={0.8}
            >
              <View style={styles.marketLabelRow}>
                <Text
                  style={[
                    styles.segmentText,
                    activeTab === 'marketplace' && styles.segmentTextActive,
                  ]}
                >
                  Marketplace
                </Text>
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>1Fi</Text>
                </View>
              </View>
              {activeTab === 'marketplace' && <View style={styles.activeUnderline} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Content based on selected tab */}
        {activeTab === 'topBrands' && (
          <View style={styles.tabSection}>
            {/* Search Online Stores */}
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search online stores..."
                placeholderTextColor={Colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <Text style={styles.sectionHeaderTitle}>Top Brands</Text>

            {/* List matching screenshot 2 */}
            {[
              { name: 'Air India', emi: 'No-cost EMIs upto 18 months', bg: '#DE1F27', text: 'AIR INDIA' },
              { name: 'Apple Premium Reseller', emi: 'No-cost EMIs upto 24 months', bg: '#000000', text: 'Apple' },
              { name: 'CaratLane', emi: 'No-cost EMIs upto 6 months', bg: '#8B5CF6', text: 'CARATLANE' },
              { name: 'Vijay Sales', emi: 'No-cost EMIs upto 12 months', bg: '#E11D48', text: 'VIJAY SALES' },
            ].map((brand, idx) => (
              <View key={idx} style={styles.brandCard}>
                <View style={[styles.brandLogoBox, { backgroundColor: brand.bg }]}>
                  <Text style={styles.brandLogoText}>{brand.text.slice(0, 5)}</Text>
                </View>
                <View style={styles.brandInfo}>
                  <Text style={styles.brandName}>{brand.name}</Text>
                  <Text style={styles.brandEmiSub}>{brand.emi}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'nearbyStores' && (
          <View style={styles.tabSection}>
            {/* Search Stores */}
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search stores..."
                placeholderTextColor={Colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.nearbyHeaderRow}>
              <Text style={styles.sectionHeaderTitle}>Nearby Stores</Text>
              <View style={styles.locationPill}>
                <Text style={styles.locationText}>Bhopal</Text>
                <Ionicons name="chevron-down" size={14} color={Colors.primary} />
              </View>
            </View>

            {/* List matching screenshot 5 */}
            {[
              {
                name: 'TripBouquet',
                distance: '576 KM',
                address: '241, Tower B, Spazedge, near Dmart, Gurugram, Haryana, 122018',
              },
              {
                name: 'Charger On Wheels',
                distance: '577 KM',
                address: 'Orchid Business Park, Near Subhash Chowk, Gurugram, Haryana, 122101',
              },
              {
                name: 'Ashoka Suzuki',
                distance: '577 KM',
                address: 'Khata No 271, 316, Badshahpur, Gurugram, Haryana',
              },
            ].map((store, idx) => (
              <View key={idx} style={styles.storeCard}>
                <View style={styles.storeIconBox}>
                  <Ionicons name="business-outline" size={24} color={Colors.primary} />
                </View>
                <View style={styles.storeInfo}>
                  <View style={styles.storeTitleRow}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <View style={styles.distanceBadge}>
                      <Text style={styles.distanceText}>{store.distance}</Text>
                    </View>
                  </View>
                  <Text style={styles.storeAddress}>{store.address}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'marketplace' && (
          <View style={styles.tabSection}>
            {/* Direct Gateway to full Marketplace */}
            <TouchableOpacity
              style={styles.featuredMarketCard}
              onPress={onNavigateToMarketplace}
              activeOpacity={0.88}
            >
              <View style={styles.featuredMarketContent}>
                <View style={styles.featuredMarketLeft}>
                  <View style={styles.verifiedRow}>
                    <Ionicons name="shield-checkmark" size={14} color={Colors.primary} />
                    <Text style={styles.verifiedText}>OFFICIAL 1FI MARKETPLACE</Text>
                  </View>
                  <Text style={styles.featuredMarketHeading}>
                    Browse Flagship Electronics
                  </Text>
                  <Text style={styles.featuredMarketSub}>
                    Apple, Samsung, Sony & OnePlus with 0% No-Cost EMI
                  </Text>
                  <View style={styles.exploreButton}>
                    <Text style={styles.exploreButtonText}>Open Marketplace</Text>
                    <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Quick Product Grid Preview */}
            <View style={styles.previewHeaderRow}>
              <Text style={styles.sectionHeaderTitle}>Featured on 1Fi</Text>
              <TouchableOpacity onPress={onNavigateToMarketplace}>
                <Text style={styles.seeAllText}>View All →</Text>
              </TouchableOpacity>
            </View>

            {[
              { id: 'prod-iphone-16-pro', name: 'iPhone 16 Pro', emi: 'From ₹19,983/mo (0% EMI)', price: '₹1,19,900', brand: 'Apple' },
              { id: 'prod-samsung-s25-ultra', name: 'Galaxy S25 Ultra 5G', emi: 'From ₹21,667/mo (0% EMI)', price: '₹1,29,999', brand: 'Samsung' },
              { id: 'prod-sony-wh1000xm5', name: 'Sony WH-1000XM5', emi: 'From ₹4,998/mo (0% EMI)', price: '₹29,990', brand: 'Sony' },
            ].map((prod) => (
              <TouchableOpacity
                key={prod.id}
                style={styles.quickProductCard}
                onPress={() => onSelectProduct(prod.id)}
                activeOpacity={0.8}
              >
                <View style={styles.quickProductInfo}>
                  <Text style={styles.quickBrand}>{prod.brand}</Text>
                  <Text style={styles.quickName}>{prod.name}</Text>
                  <Text style={styles.quickEmi}>{prod.emi}</Text>
                </View>
                <View style={styles.quickPriceWrap}>
                  <Text style={styles.quickPrice}>{prod.price}</Text>
                  <View style={styles.quickSelectBtn}>
                    <Text style={styles.quickSelectText}>Select</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  heroSection: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 10,
    gap: 5,
  },
  pillBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  heroContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  heroTextCol: {
    flex: 1,
  },
  heroHeading: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 27,
    marginBottom: 6,
  },
  heroSubheading: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 15,
  },
  heroGraphicBox: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.primaryDark,
    borderRadius: 10,
    padding: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 3,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    position: 'relative',
  },
  segmentTabActive: {
    backgroundColor: '#F3F4FD',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  segmentTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  marketLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  newBadge: {
    backgroundColor: Colors.teal,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  newBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 2,
    width: 22,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  tabSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: Colors.text,
  },
  sectionHeaderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 12,
  },
  nearbyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF0FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  brandCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  brandLogoBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  brandLogoText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  brandEmiSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  storeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF0FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  distanceBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  distanceText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  storeAddress: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  featuredMarketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#D7DCFA',
    marginBottom: 18,
  },
  featuredMarketContent: {},
  featuredMarketLeft: {},
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
  featuredMarketHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  featuredMarketSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 14,
    lineHeight: 16,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  previewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  quickProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickProductInfo: {
    flex: 1,
  },
  quickBrand: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  quickName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginVertical: 2,
  },
  quickEmi: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.tealDark,
  },
  quickPriceWrap: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  quickPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  quickSelectBtn: {
    backgroundColor: '#EEF0FD',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  quickSelectText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
});
