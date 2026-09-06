import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ColorVariant, StorageVariant } from '../types';
import { Colors } from '../theme/colors';

interface VariantSelectorProps {
  colors: ColorVariant[];
  selectedColor: ColorVariant;
  onSelectColor: (color: ColorVariant) => void;
  storageOptions: StorageVariant[];
  selectedStorage: StorageVariant;
  onSelectStorage: (storage: StorageVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
  storageOptions,
  selectedStorage,
  onSelectStorage,
}) => {
  return (
    <View style={styles.container}>
      {/* Color Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Color</Text>
          <Text style={styles.selectedName}>{selectedColor.name}</Text>
        </View>

        <View style={styles.colorsRow}>
          {colors.map((color) => {
            const isSelected = selectedColor.id === color.id;
            return (
              <TouchableOpacity
                key={color.id}
                onPress={() => onSelectColor(color)}
                style={[
                  styles.colorChip,
                  isSelected && styles.colorChipSelected,
                ]}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color.hex },
                  ]}
                />
                <Text
                  style={[
                    styles.colorLabel,
                    isSelected && styles.colorLabelSelected,
                  ]}
                >
                  {color.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Storage / Spec Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Storage / Edition</Text>
          <Text style={styles.selectedName}>{selectedStorage.label}</Text>
        </View>

        <View style={styles.storageRow}>
          {storageOptions.map((opt) => {
            const isSelected = selectedStorage.id === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => onSelectStorage(opt)}
                style={[
                  styles.storageCard,
                  isSelected && styles.storageCardSelected,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.storageLabel,
                    isSelected && styles.storageLabelSelected,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  selectedName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.tealDark,
  },
  colorsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.cardBg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 6,
  },
  colorChipSelected: {
    borderColor: Colors.tealDark,
    backgroundColor: Colors.tealLight,
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  colorLabel: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  colorLabelSelected: {
    color: Colors.tealDark,
    fontWeight: '700',
  },
  storageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  storageCard: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: Colors.cardBg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storageCardSelected: {
    borderColor: Colors.tealDark,
    backgroundColor: Colors.tealLight,
  },
  storageLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  storageLabelSelected: {
    color: Colors.tealDark,
    fontWeight: '700',
  },
});
