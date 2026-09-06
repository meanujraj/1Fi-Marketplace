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
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
            {/* Header Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={32} color="#059669" />
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
              <Ionicons name="shield-checkmark" size={16} color="#059669" />
              <Text style={styles.trustText}>
                Backed by 1Fi RBI-regulated Lending Partners. No hidden charges.
              </Text>
            </View>

            {/* Rounded-Full Action Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onClose}
              activeOpacity={0.88}
            >
              <Text style={styles.confirmButtonText}>Back to Marketplace</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
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
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight: '90%',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  scrollBody: {
    paddingBottom: 8,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DEF7EC',
    borderWidth: 1,
    borderColor: '#BCF0DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#18181B',
    textAlign: 'center',
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 12.5,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  summaryCard: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#E4E4E7',
    padding: 14,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    fontSize: 12.5,
    color: '#71717A',
  },
  value: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#18181B',
  },
  valueBold: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#712CDC',
  },
  emiHighlight: {
    fontSize: 15,
    fontWeight: '800',
    color: '#712CDC',
  },
  greenText: {
    color: '#059669',
    fontWeight: '700',
  },
  divider: {
    height: 0.8,
    backgroundColor: '#E4E4E7',
    marginVertical: 6,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 0.8,
    borderColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  trustText: {
    fontSize: 11,
    color: '#065F46',
    flex: 1,
    fontWeight: '500',
    lineHeight: 15,
  },
  confirmButton: {
    backgroundColor: '#712CDC',
    height: 48,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
