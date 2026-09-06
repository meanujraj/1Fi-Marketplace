import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface LimitScreenProps {
  onFetchPortfolio: () => void;
}

export const LimitScreen: React.FC<LimitScreenProps> = ({ onFetchPortfolio }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Lock with gold coin graphic */}
        <View style={styles.lockGraphicWrap}>
          <View style={styles.lockBody}>
            <View style={styles.goldCoin} />
            <View style={styles.keyhole} />
          </View>
          <Ionicons name="sparkles" size={16} color={Colors.primary} style={styles.sparkleIcon} />
        </View>

        <Text style={styles.overheadLabel}>CHECK ELIGIBILITY</Text>
        <Text style={styles.mainTitle}>Shop on 0% interest backed by{'\n'}your Mutual Funds</Text>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onFetchPortfolio}
          activeOpacity={0.85}
        >
          <Text style={styles.actionBtnText}>Fetch my portfolio</Text>
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
  lockGraphicWrap: {
    width: 90,
    height: 90,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  lockBody: {
    width: 64,
    height: 60,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  goldCoin: {
    position: 'absolute',
    top: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD700',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  keyhole: {
    width: 8,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#0F0860',
    marginTop: 6,
  },
  sparkleIcon: {
    position: 'absolute',
    top: 0,
    left: 4,
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
