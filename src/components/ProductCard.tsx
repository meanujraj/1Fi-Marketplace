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
      {/* Product Image Area with Badge */}
      <View style={styles.imageArea}>
        {product.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <Image
          source={primaryImage}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Card Content Details */}
      <View style={styles.content}>
        {/* Brand & Ratings Row */}
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={styles.ratingVal}>{product.rating.toFixed(1)}</Text>
            {product.reviewCount ? (
              <Text style={styles.ratingCount}>
                | {product.reviewCount > 999 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount} ratings
              </Text>
            ) : null}
          </View>
        </View>

        {/* Product Title */}
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>

        {/* Short Specs / Tagline */}
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
              <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
            </View>
          ) : null}
        </View>

        {/* EMI Highlight Banner */}
        <View style={styles.emiBanner}>
          <View style={styles.emiFlashCircle}>
            <Ionicons name="flash" size={13} color="#059669" />
          </View>
          <View style={styles.emiTextWrap}>
            <Text style={styles.emiPretext}>From</Text>
            <Text style={styles.emiPrice}>
              ₹{(product.startingEmi || lowestEmiPlan.monthlyAmount).toLocaleString('en-IN')}/month
            </Text>
          </View>
          {lowestEmiPlan.isNoCost && (
            <View style={styles.noCostBadge}>
              <Text style={styles.noCostText}>0% Interest</Text>
            </View>
          )}
        </View>

        {/* Action Button matching 1Fi style */}
        <View style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>View Product</Text>
          <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  imageArea: {
    width: '100%',
    height: 190,
    backgroundColor: '#FBFBFE',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#712CDC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '700',
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
    color: '#92400E',
  },
  ratingCount: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  tagline: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
  },
  originalPrice: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountPill: {
    backgroundColor: '#DEF7EC',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  discountText: {
    color: '#03543F',
    fontSize: 10,
    fontWeight: '700',
  },
  emiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 14,
    gap: 6,
  },
  emiFlashCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emiTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  emiPretext: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '500',
  },
  emiPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  noCostBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  noCostText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#712CDC',
    paddingVertical: 11,
    borderRadius: 10,
    gap: 6,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
