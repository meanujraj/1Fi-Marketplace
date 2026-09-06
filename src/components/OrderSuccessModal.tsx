import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product, ColorVariant, StorageVariant, EmiPlan } from '../types';
import { Colors } from '../theme/colors';

interface OrderSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product;
  selectedColor: ColorVariant;
  selectedStorage: StorageVariant;
  selectedEmiPlan: EmiPlan;
  finalPrice: number;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  visible,
  onClose,
  product,
  selectedColor,
  selectedStorage,
  selectedEmiPlan,
  finalPrice,
}) => {
  const applicationNumber = `1FI-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="checkmark-circle" size={56} color={Colors.tealDark} />
              </View>
            </View>

            <Text style={styles.successTitle}>1Fi EMI Approved!</Text>
            <Text style={styles.successSubtitle}>
              Your instant credit application is approved with zero down payment.
            </Text>

            {/* Application Summary Box */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.label}>Application ID</Text>
                <Text style={styles.valueBold}>{applicationNumber}</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.label}>Product</Text>
                <Text style={styles.value}>{product.name}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.label}>Configuration</Text>
                <Text style={styles.value}>
                  {selectedColor.name} • {selectedStorage.label}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.label}>Total Device Price</Text>
                <Text style={styles.value}>₹{finalPrice.toLocaleString('en-IN')}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.label}>Monthly EMI</Text>
                <Text style={styles.emiHighlight}>
                  ₹{selectedEmiPlan.monthlyAmount.toLocaleString('en-IN')}/mo
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.label}>Tenure</Text>
                <Text style={styles.value}>{selectedEmiPlan.tenureMonths} Months</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.label}>Down Payment</Text>
                <Text style={[styles.value, styles.greenText]}>₹0 (Zero Down)</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.label}>First EMI Due</Text>
                <Text style={styles.value}>5th of next month</Text>
              </View>
            </View>

            {/* 1Fi Trust Banner */}
            <View style={styles.trustBanner}>
              <Ionicons name="shield-checkmark" size={18} color={Colors.tealDark} />
              <Text style={styles.trustText}>
                Backed by 1Fi RBI-regulated Lending Partners. No hidden charges.
              </Text>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmButtonText}>Back to Marketplace</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 37, 64, 0.7)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Colors.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
    maxHeight: '90%',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  valueBold: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  emiHighlight: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.tealDark,
  },
  greenText: {
    color: Colors.tealDark,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 6,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tealLight,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    gap: 8,
  },
  trustText: {
    fontSize: 11,
    color: '#0D624D',
    flex: 1,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
