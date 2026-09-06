import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface EmiDuesScreenProps {
  onCheckEligibility: () => void;
}

export const EmiDuesScreen: React.FC<EmiDuesScreenProps> = ({ onCheckEligibility }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Receipt illustration */}
        <View style={styles.illustrationBox}>
          <View style={styles.receiptPaper}>
            <View style={styles.receiptHeaderBar} />
            <View style={styles.receiptLine} />
            <View style={styles.receiptLineShort} />
            <View style={styles.receiptBadge}>
              <Text style={styles.rupeeSymbol}>₹</Text>
            </View>
          </View>
        </View>

        <Text style={styles.overheadLabel}>NOTHING DUE YET</Text>
        <Text style={styles.mainTitle}>Looks like you haven't{'\n'}shopped yet with 1Fi</Text>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onCheckEligibility}
          activeOpacity={0.85}
        >
          <Text style={styles.actionBtnText}>Check eligibility</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  illustrationBox: {
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptPaper: {
    width: 84,
    height: 110,
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#C7D2FE',
    padding: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptHeaderBar: {
    width: 48,
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
    marginBottom: 10,
  },
  receiptLine: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    marginBottom: 6,
  },
  receiptLineShort: {
    width: 26,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
  },
  receiptBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  rupeeSymbol: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  overheadLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 28,
  },
  actionBtn: {
    backgroundColor: Colors.primary,
    width: '100%',
    maxWidth: 280,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
