import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [simulateErrorActive, setSimulateErrorActive] = useState<boolean>(false);

  const loadProducts = useCallback(async () => {
    try {
      setError(null);
      const data = await marketplaceRepository.getProducts(searchQuery, selectedCategory);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery, selectedCategory]);

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

  return (
    <View style={styles.container}>
      {/* Header with error simulator test button */}
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

      {/* Search Input Bar */}
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
      </View>

      {/* Category Pills */}
      <View style={styles.categoryWrap}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                ]}
                onPress={() => setSelectedCategory(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

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
            Try checking spelling or search for another brand or model.
          </Text>
          <TouchableOpacity
            style={styles.clearFilterBtn}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            <Text style={styles.clearFilterText}>Clear Search</Text>
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
    paddingHorizontal: 8,
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
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  searchBar: {
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
  categoryWrap: {
    paddingVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
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
});
