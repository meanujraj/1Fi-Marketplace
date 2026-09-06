import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { marketplaceRepository } from '../services/marketplaceRepository';
import { Colors } from '../theme/colors';

interface MarketplaceScreenProps {
  onBack: () => void;
  onSelectProduct: (productId: string) => void;
}

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables'];

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  onBack,
  onSelectProduct,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Smartphones');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedStorage, setSelectedStorage] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);
  const [simulateErrorActive, setSimulateErrorActive] = useState<boolean>(false);

  // Data-driven dynamic filter options
  const availableBrands = useMemo(() => marketplaceRepository.getAvailableBrands(), []);
  const availableStorageOptions = useMemo(() => marketplaceRepository.getAvailableStorageOptions(), []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'Smartphones' && selectedCategory !== 'All') count++;
    if (selectedBrand !== 'All') count++;
    if (selectedStorage !== 'All') count++;
    if (selectedPriceRange !== 'All') count++;
    return count;
  }, [selectedCategory, selectedBrand, selectedStorage, selectedPriceRange]);

  const loadProducts = useCallback(async () => {
    try {
      setError(null);
      const data = await marketplaceRepository.getProducts(
        searchQuery,
        selectedCategory,
        selectedBrand,
        selectedStorage,
        selectedPriceRange
      );
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery, selectedCategory, selectedBrand, selectedStorage, selectedPriceRange]);

  useEffect(() => {
    setLoading(true);
    loadProducts();
  }, [loadProducts]);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  const toggleErrorSimulation = () => {
    const nextVal = !simulateErrorActive;
    setSimulateErrorActive(nextVal);
    marketplaceRepository.setSimulateError(nextVal);
    setLoading(true);
    loadProducts();
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Smartphones');
    setSelectedBrand('All');
    setSelectedStorage('All');
    setSelectedPriceRange('All');
  };

  return (
    <View style={styles.container}>
      {/* Header with official logo & simulator test toggle */}
      <Header
        title="1Fi Marketplace"
        subtitle="Exclusive credit line & flexible EMI"
        onBack={onBack}
        rightAction={
          <TouchableOpacity
            style={[
              styles.errorToggleBtn,
              simulateErrorActive && styles.errorToggleBtnActive,
            ]}
            onPress={toggleErrorSimulation}
            activeOpacity={0.7}
          >
            <Ionicons
              name={simulateErrorActive ? 'warning' : 'bug-outline'}
              size={16}
              color={simulateErrorActive ? '#FFFFFF' : Colors.textSecondary}
            />
            <Text
              style={[
                styles.errorToggleText,
                simulateErrorActive && styles.errorToggleTextActive,
              ]}
            >
              {simulateErrorActive ? 'Simulated Error' : 'Test Error'}
            </Text>
          </TouchableOpacity>
        }
      />

      {/* Search Bar & Filter Action */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands or models..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Modal Trigger Button */}
        <TouchableOpacity
          style={[
            styles.filterTriggerBtn,
            activeFilterCount > 0 && styles.filterTriggerBtnActive,
          ]}
          onPress={() => setIsFilterModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={activeFilterCount > 0 ? '#FFFFFF' : Colors.primary}
          />
          {activeFilterCount > 0 && (
            <View style={styles.badgeCircle}>
              <Text style={styles.badgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Categories Horizontal Selector */}
      <View style={styles.sectionPillWrap}>
        <Text style={styles.pillSectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsList}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.pillChip, isSelected && styles.pillChipSelected]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.pillText, isSelected && styles.pillTextSelected]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Brands Horizontal Selector */}
      <View style={styles.sectionPillWrap}>
        <Text style={styles.pillSectionTitle}>Brands</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsList}
        >
          {availableBrands.map((brand) => {
            const isSelected = selectedBrand === brand;
            return (
              <TouchableOpacity
                key={brand}
                style={[styles.pillChip, isSelected && styles.pillChipSelected]}
                onPress={() => setSelectedBrand(brand)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.pillText, isSelected && styles.pillTextSelected]}
                >
                  {brand === 'All' ? 'All Brands' : brand}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Active Filter Chips Row */}
      {activeFilterCount > 0 && (
        <View style={styles.activeFiltersRow}>
          <Text style={styles.activeFiltersLabel}>Filtered by:</Text>
          {selectedBrand !== 'All' && (
            <TouchableOpacity
              style={styles.activeFilterPill}
              onPress={() => setSelectedBrand('All')}
            >
              <Text style={styles.activeFilterPillText}>Brand: {selectedBrand}</Text>
              <Ionicons name="close" size={14} color={Colors.primary} />
            </TouchableOpacity>
          )}
          {selectedStorage !== 'All' && (
            <TouchableOpacity
              style={styles.activeFilterPill}
              onPress={() => setSelectedStorage('All')}
            >
              <Text style={styles.activeFilterPillText}>Storage: {selectedStorage}</Text>
              <Ionicons name="close" size={14} color={Colors.primary} />
            </TouchableOpacity>
          )}
          {selectedPriceRange !== 'All' && (
            <TouchableOpacity
              style={styles.activeFilterPill}
              onPress={() => setSelectedPriceRange('All')}
            >
              <Text style={styles.activeFilterPillText}>
                {selectedPriceRange === 'under50k' ? '< ₹50k' : selectedPriceRange === '50kTo100k' ? '₹50k-₹1L' : '> ₹1L'}
              </Text>
              <Ionicons name="close" size={14} color={Colors.primary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleResetFilters}>
            <Text style={styles.resetAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content Area */}
      {loading && !refreshing ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={Colors.tealDark} />
          <Text style={styles.loadingText}>Loading curated 1Fi products...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerState}>
          <View style={styles.errorIconCircle}>
            <Ionicons name="alert-circle-outline" size={44} color={Colors.danger} />
          </View>
          <Text style={styles.errorTitle}>Unable to load products</Text>
          <Text style={styles.errorSubtitle}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              marketplaceRepository.setSimulateError(false);
              setSimulateErrorActive(false);
              setLoading(true);
              loadProducts();
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={16} color="#FFFFFF" />
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.centerState}>
          <Ionicons name="search" size={44} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>No products found</Text>
          <Text style={styles.emptySubtitle}>
            Try checking spelling or reset your filters.
          </Text>
          <TouchableOpacity
            style={styles.clearFilterBtn}
            onPress={handleResetFilters}
          >
            <Text style={styles.clearFilterText}>Clear Search & Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.tealDark]}
            />
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => onSelectProduct(item.id)}
            />
          )}
        />
      )}

      {/* Data-Driven Filter Slide-Up Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filter Products</Text>
              <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
              {/* Brand Filter */}
              <Text style={styles.sheetSectionTitle}>Brand</Text>
              <View style={styles.sheetWrapRow}>
                {availableBrands.map((b) => (
                  <TouchableOpacity
                    key={b}
                    style={[
                      styles.sheetFilterChip,
                      selectedBrand === b && styles.sheetFilterChipSelected,
                    ]}
                    onPress={() => setSelectedBrand(b)}
                  >
                    <Text
                      style={[
                        styles.sheetFilterChipText,
                        selectedBrand === b && styles.sheetFilterChipTextSelected,
                      ]}
                    >
                      {b === 'All' ? 'All Brands' : b}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Storage Filter */}
              <Text style={styles.sheetSectionTitle}>Storage / RAM</Text>
              <View style={styles.sheetWrapRow}>
                {availableStorageOptions.map((st) => (
                  <TouchableOpacity
                    key={st}
                    style={[
                      styles.sheetFilterChip,
                      selectedStorage === st && styles.sheetFilterChipSelected,
                    ]}
                    onPress={() => setSelectedStorage(st)}
                  >
                    <Text
                      style={[
                        styles.sheetFilterChipText,
                        selectedStorage === st && styles.sheetFilterChipTextSelected,
                      ]}
                    >
                      {st === 'All' ? 'All Capacities' : st}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Price Range Filter */}
              <Text style={styles.sheetSectionTitle}>Price Range</Text>
              <View style={styles.sheetWrapRow}>
                {[
                  { id: 'All', label: 'All Prices' },
                  { id: 'under50k', label: 'Under ₹50,000' },
                  { id: '50kTo100k', label: '₹50,000 – ₹1,00,000' },
                  { id: 'above100k', label: 'Above ₹1,00,000' },
                ].map((pr) => (
                  <TouchableOpacity
                    key={pr.id}
                    style={[
                      styles.sheetFilterChip,
                      selectedPriceRange === pr.id && styles.sheetFilterChipSelected,
                    ]}
                    onPress={() => setSelectedPriceRange(pr.id)}
                  >
                    <Text
                      style={[
                        styles.sheetFilterChipText,
                        selectedPriceRange === pr.id && styles.sheetFilterChipTextSelected,
                      ]}
                    >
                      {pr.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.sheetFooter}>
              <TouchableOpacity
                style={styles.sheetResetBtn}
                onPress={() => {
                  setSelectedBrand('All');
                  setSelectedStorage('All');
                  setSelectedPriceRange('All');
                }}
              >
                <Text style={styles.sheetResetText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sheetApplyBtn}
                onPress={() => setIsFilterModalVisible(false)}
              >
                <Text style={styles.sheetApplyText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.borderLight,
    gap: 4,
  },
  errorToggleBtnActive: {
    backgroundColor: Colors.danger,
  },
  errorToggleText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  errorToggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text,
  },
  filterTriggerBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterTriggerBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  badgeCircle: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.danger,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  sectionPillWrap: {
    paddingTop: 6,
    paddingBottom: 4,
  },
  pillSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  pillsList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pillChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  activeFiltersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 6,
  },
  activeFiltersLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  activeFilterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  activeFilterPillText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  resetAllText: {
    fontSize: 11,
    color: Colors.danger,
    fontWeight: '700',
    marginLeft: 4,
  },
  productsList: {
    padding: 16,
    paddingBottom: 32,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  errorIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  errorSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 260,
    marginBottom: 16,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 240,
    marginBottom: 16,
  },
  clearFilterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.borderLight,
  },
  clearFilterText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.tealDark,
  },
  // Slide-up Filter Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  filterSheet: {
    backgroundColor: Colors.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    paddingBottom: 24,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  sheetSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 10,
  },
  sheetWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sheetFilterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.borderLight,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sheetFilterChipSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: Colors.primary,
  },
  sheetFilterChipText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sheetFilterChipTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  sheetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  sheetResetBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetResetText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  sheetApplyBtn: {
    flex: 2,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetApplyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
