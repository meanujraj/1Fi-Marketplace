import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmiPlan } from '../types';
import { Colors } from '../theme/colors';

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
  totalPrice: number;
}

export const EmiPlanCard: React.FC<EmiPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
  totalPrice,
}) => {
  const totalPayable = plan.monthlyAmount * plan.tenureMonths + plan.processingFee;
  const extraCost = Math.max(0, totalPayable - totalPrice);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={() => onSelect(plan)}
      activeOpacity={0.7}
    >
      {plan.tag ? (
        <View
          style={[
            styles.tagBadge,
            plan.isNoCost ? styles.tagNoCost : styles.tagStandard,
          ]}
        >
          <Text
            style={[
              styles.tagText,
              plan.isNoCost ? styles.tagTextNoCost : styles.tagTextStandard,
            ]}
          >
            {plan.tag}
          </Text>
        </View>
      ) : null}

      <View style={styles.topRow}>
        {/* Radio Indicator */}
        <View
          style={[
            styles.radioCircle,
            isSelected && styles.radioCircleSelected,
          ]}
        >
          {isSelected && <View style={styles.radioInner} />}
        </View>

        {/* Plan Header */}
        <View style={styles.tenureWrap}>
          <Text style={styles.tenureTitle}>{plan.tenureMonths} Months Plan</Text>
          <Text style={styles.interestSubtitle}>
            {plan.isNoCost
              ? 'No Cost EMI (0% Interest)'
              : `${plan.interestRatePercent}% p.a. standard rate`}
          </Text>
        </View>

        {/* Monthly EMI */}
        <View style={styles.amountWrap}>
          <Text style={styles.monthlyAmount}>
            ₹{plan.monthlyAmount.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.perMonthText}>/ month</Text>
        </View>
      </View>

      {/* Expanded Breakdown when selected */}
      {isSelected && (
        <View style={styles.breakdownContainer}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Total Loan Amount</Text>
            <Text style={styles.breakdownValue}>₹{totalPrice.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Interest charges</Text>
            <Text style={[styles.breakdownValue, plan.isNoCost && styles.greenText]}>
              {plan.isNoCost ? '₹0 (Subsidized)' : `₹${extraCost.toLocaleString('en-IN')}`}
            </Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Processing Fee</Text>
            <Text style={styles.breakdownValue}>
              {plan.processingFee === 0 ? 'FREE' : `₹${plan.processingFee}`}
            </Text>
          </View>
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{totalPayable.toLocaleString('en-IN')}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 12,
    position: 'relative',
  },
  cardSelected: {
    borderColor: Colors.tealDark,
    backgroundColor: '#F7FDFB',
  },
  tagBadge: {
    position: 'absolute',
    top: -9,
    right: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 5,
  },
  tagNoCost: {
    backgroundColor: Colors.tealDark,
  },
  tagStandard: {
    backgroundColor: Colors.indigo,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tagTextNoCost: {
    color: '#FFFFFF',
  },
  tagTextStandard: {
    color: '#FFFFFF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioCircleSelected: {
    borderColor: Colors.tealDark,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.tealDark,
  },
  tenureWrap: {
    flex: 1,
  },
  tenureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  interestSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  amountWrap: {
    alignItems: 'flex-end',
  },
  monthlyAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  perMonthText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  breakdownContainer: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCF2E7',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  breakdownLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  greenText: {
    color: Colors.tealDark,
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
});
