import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onGoToShop: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onGoToShop }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* GET STARTED Banner */}
        <View style={styles.getStartedBanner}>
          <View style={styles.topRow}>
            <View style={styles.bannerTextCol}>
              <Text style={styles.getStartedLabel}>GET STARTED</Text>
              <Text style={styles.bannerHeadline}>
                Shop on <Text style={styles.boldUnderline}>no-cost EMI</Text>
              </Text>
              <Text style={styles.bannerSubhead}>
                Backed by your mutual funds, No credit pull, No charges, & quick approval.
              </Text>
            </View>

            <View style={styles.zeroInterestCol}>
              <Text style={styles.zeroBig}>0%</Text>
              <Text style={styles.interestLabel}>INTEREST</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.eligibilityBtn}
            onPress={onGoToShop}
            activeOpacity={0.85}
          >
            <Text style={styles.eligibilityBtnText}>Check eligibility</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Section: OFFERS */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionMarker} />
          <Text style={styles.sectionTitle}>OFFERS</Text>
        </View>

        {/* Offer Card 1: Wakefit */}
        <View style={styles.offerCard}>
          <Text style={styles.offerCategory}>FURNITURE | MATTRESS | HOME DECOR</Text>
          <View style={styles.offerRow}>
            <Text style={styles.offerHeading}>Dream homes to{'\n'}sweet dreams</Text>
            <View style={styles.brandBox}>
              <Text style={styles.brandBoxText}>wakefit</Text>
            </View>
          </View>
          <View style={styles.offerPill}>
            <Ionicons name="checkmark" size={13} color="#FFFFFF" />
            <Text style={styles.offerPillText}>Comfort on 12m no-cost EMIs</Text>
          </View>
        </View>

        {/* Carousel Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Section: SHOP USING 1FI AT TOP BRANDS */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionMarker} />
          <Text style={styles.sectionTitle}>SHOP USING 1FI AT TOP BRANDS</Text>
        </View>

        <View style={styles.brandGrid}>
          {[
            { name: 'Air India', color: '#DE1F27' },
            { name: 'goibibo', color: '#EC5B24' },
            { name: 'wakefit', color: '#10B981' },
            { name: 'EaseMyTrip', color: '#0084FF' },
            { name: 'Vijay Sales', color: '#E11D48' },
          ].map((b, i) => (
            <TouchableOpacity
              key={i}
              style={styles.brandItem}
              onPress={onGoToShop}
              activeOpacity={0.7}
            >
              <View style={styles.brandIconCircle}>
                <Text style={[styles.brandInitials, { color: b.color }]}>
                  {b.name.slice(0, 2).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.brandItemName} numberOfLines={1}>
                {b.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Section: WHY PAY WITH 1FI */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionMarker} />
          <Text style={styles.sectionTitle}>WHY PAY WITH 1FI</Text>
        </View>

        <View style={styles.whyBox}>
          <View style={styles.whyItem}>
            <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
            <Text style={styles.whyText}>Mutual fund backed loans with zero credit impact</Text>
          </View>
          <View style={styles.whyItem}>
            <Ionicons name="flash" size={20} color={Colors.primary} />
            <Text style={styles.whyText}>Instant KYC & approval under 60 seconds</Text>
          </View>
        </View>
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
    padding: 16,
    paddingBottom: 110,
  },
  getStartedBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  getStartedLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
    marginBottom: 6,
  },
  bannerHeadline: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 6,
  },
  boldUnderline: {
    textDecorationLine: 'underline',
  },
  bannerSubhead: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
    marginBottom: 16,
  },
  zeroInterestCol: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  zeroBig: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  interestLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  eligibilityBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  eligibilityBtnText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionMarker: {
    width: 3,
    height: 14,
    borderRadius: 1.5,
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.8,
  },
  offerCard: {
    backgroundColor: '#1E1B4B',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  offerCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FBBF24',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  offerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  offerHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 22,
  },
  brandBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  brandBoxText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  offerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 6,
  },
  offerPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  dotActive: {
    width: 18,
    backgroundColor: Colors.primary,
  },
  brandGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  brandItem: {
    alignItems: 'center',
    width: (width - 60) / 5,
  },
  brandIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  brandInitials: {
    fontSize: 12,
    fontWeight: '800',
  },
  brandItemName: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  whyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  whyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  whyText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
    flex: 1,
  },
});
