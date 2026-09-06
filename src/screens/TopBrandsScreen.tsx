import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Colors } from '../theme/colors';

interface TopBrandsScreenProps {
  onBack: () => void;
}

export const TopBrandsScreen: React.FC<TopBrandsScreenProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <Header title="Top Brands" onBack={onBack} />
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="ribbon-outline" size={48} color={Colors.textMuted} />
        </View>
        <Text style={styles.title}>Top Brands</Text>
        <Text style={styles.subtitle}>
          This section is a placeholder per assignment specification.
        </Text>
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
    padding: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 18,
  },
});
