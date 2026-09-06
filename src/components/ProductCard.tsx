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
  const lowestEmiPlan = product.emiPlans.reduce(
    (min, plan) => (plan.monthlyAmount < min.monthlyAmount ? plan : min),
    product.emiPlans[0]
  );

  const primaryImage =
    typeof product.images[0] === 'string'
      ? { uri: product.images[0] }
      : product.images[0];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Product Image Area */}
      <View style={styles.imageArea}>
        <Image
          source={primaryImage}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Card Content */}
      <View style={styles.content}>
        {/* Brand & Ratings */}
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={styles.ratingVal}>{product.rating.toFixed(1)}</Text>
            {product.reviewCount ? (
              <Text style={styles.ratingCount}>
                ({product.reviewCount > 999 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
              </Text>
            ) : null}
          </View>
        </View>

        {/* Product Title */}
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>

        {/* Key Model Spec */}
        <Text style={styles.tagline} numberOfLines={1}>
          {product.tagline}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.basePrice.toLocaleString('en-IN')}</Text>
          {product.originalPrice > product.basePrice ? (
            <Text style={styles.originalPrice}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </Text>
          ) : null}
          {product.discountPercent > 0 ? (
            <View style={styles.discountPill}>
              <Text style={styles.discountText}>{product.discountPercent}% off</Text>
            </View>
          ) : null}
        </View>

        {/* 1Fi-Styled Authentic EMI Pill */}
        <View style={styles.emiPillRow}>
          <View style={styles.emiPill}>
            <Text style={styles.emiPillLabel}>EMI from</Text>
            <Text style={styles.emiPillAmount}>
              ₹{(product.startingEmi || lowestEmiPlan.monthlyAmount).toLocaleString('en-IN')}/mo
            </Text>
          </View>
          {lowestEmiPlan.isNoCost && (
            <View style={styles.noCostPill}>
              <Text style={styles.noCostText}>0% Interest</Text>
            </View>
          )}
        </View>

        {/* 1Fi Rounded-Full Primary Action */}
        <View style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>View Product</Text>
          <Ionicons name="chevron-forward" size={15} color="#FFFFFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 0.8,
    borderColor: '#E4E4E7',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: 'rgba(20, 14, 50, 0.04)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  imageArea: {
    width: '100%',
    height: 180,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F4F4F5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
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
    color: '#71717A',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#18181B',
  },
  ratingCount: {
    fontSize: 11,
    color: '#71717A',
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18181B',
    marginBottom: 2,
  },
  tagline: {
    fontSize: 12.5,
    color: '#71717A',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#18181B',
  },
  originalPrice: {
    fontSize: 13,
    color: '#A1A1AA',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountPill: {
    backgroundColor: '#F5F0FF',
    borderWidth: 0.8,
    borderColor: '#ECE5FF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 9999,
    marginLeft: 8,
  },
  discountText: {
    color: '#5C22A5',
    fontSize: 10.5,
    fontWeight: '700',
  },
  emiPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  emiPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0FF',
    borderWidth: 0.8,
    borderColor: '#ECE5FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
    gap: 4,
  },
  emiPillLabel: {
    fontSize: 11,
    color: '#5C22A5',
    fontWeight: '500',
  },
  emiPillAmount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5C22A5',
  },
  noCostPill: {
    backgroundColor: '#ECFDF5',
    borderWidth: 0.8,
    borderColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  noCostText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#712CDC',
    height: 44,
    borderRadius: 9999,
    gap: 4,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
});
