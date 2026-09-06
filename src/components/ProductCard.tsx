import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { Colors } from '../theme/colors';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  // Lowest EMI plan calculation
  const lowestEmiPlan = product.emiPlans.reduce((min, plan) =>
    plan.monthlyAmount < min.monthlyAmount ? plan : min,
    product.emiPlans[0]
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Badge tag */}
      {product.badge ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      ) : null}

      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof product.images[0] === 'string' ? { uri: product.images[0] } : product.images[0]}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product info */}
      <View style={styles.infoContainer}>
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={11} color="#F59E0B" />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            {product.reviewCount ? (
              <Text style={styles.reviewCountText}>
                ({product.reviewCount > 999 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
              </Text>
            ) : null}
          </View>
        </View>

        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.tagline} numberOfLines={1}>
          {product.tagline}
        </Text>

        {/* Pricing */}
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>₹{product.basePrice.toLocaleString('en-IN')}</Text>
          {product.originalPrice > product.basePrice ? (
            <Text style={styles.originalPriceText}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </Text>
          ) : null}
          {product.discountPercent > 0 ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discountPercent}% off</Text>
            </View>
          ) : null}
        </View>

        {/* EMI Highlight */}
        <View style={styles.emiBanner}>
          <View style={styles.emiIconBox}>
            <Ionicons name="flash" size={12} color={Colors.tealDark} />
          </View>
          <View style={styles.emiTextWrap}>
            <Text style={styles.emiLabel}>{product.startingEmiLabel || 'EMI starts at'}</Text>
            <Text style={styles.emiAmount}>
              ₹{(product.startingEmi || lowestEmiPlan.monthlyAmount).toLocaleString('en-IN')}/mo
            </Text>
          </View>
          {lowestEmiPlan.isNoCost && (
            <View style={styles.noCostChip}>
              <Text style={styles.noCostText}>0%</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '90%',
    height: '90%',
  },
  infoContainer: {
    padding: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  reviewCountText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#B45309',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  tagline: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  originalPriceText: {
    fontSize: 13,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#166534',
    fontSize: 11,
    fontWeight: '700',
  },
  emiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tealLight,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B3F0E0',
  },
  emiIconBox: {
    marginRight: 8,
  },
  emiTextWrap: {
    flex: 1,
  },
  emiLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  emiAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.tealDark,
  },
  noCostChip: {
    backgroundColor: Colors.tealDark,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  noCostText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
