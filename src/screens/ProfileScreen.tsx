import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  const actions = [
    {
      title: 'Profile details',
      desc: 'Name, contact and KYC info',
      icon: 'person-outline' as const,
    },
    {
      title: 'Purchases',
      desc: 'Orders, invoices and loan status',
      icon: 'cube-outline' as const,
    },
    {
      title: 'Pledge history',
      desc: 'Funds you pledged or released',
      icon: 'wallet-outline' as const,
    },
    {
      title: 'Invite friends',
      desc: 'Share the app, earn rewards',
      icon: 'people-outline' as const,
      badge: 'EARN ₹500',
    },
    {
      title: 'Support & FAQs',
      desc: 'Find answers or contact us',
      icon: 'help-circle-outline' as const,
    },
    {
      title: 'Privacy policy',
      desc: 'How we handle your data',
      icon: 'shield-outline' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenHeading}>Profile</Text>
        <Text style={styles.screenSubheading}>
          Manage your account settings and personal preferences.
        </Text>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <View style={styles.userTextWrap}>
            <Text style={styles.userName}>User</Text>
            <Text style={styles.userPhone}>+91 98••••••01</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>

        {/* Quick Action List */}
        <View style={styles.actionsList}>
          {actions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              activeOpacity={0.7}
            >
              <View style={styles.actionIconBox}>
                <Ionicons name={item.icon} size={20} color={Colors.primary} />
              </View>
              <View style={styles.actionTextBox}>
                <Text style={styles.actionTitle}>{item.title}</Text>
                <Text style={styles.actionDesc}>{item.desc}</Text>
              </View>
              {item.badge ? (
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>{item.badge}</Text>
                </View>
              ) : null}
              <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
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
    padding: 20,
    paddingBottom: 110,
  },
  screenHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  screenSubheading: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 20,
    lineHeight: 18,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEF0FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  userTextWrap: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  actionsList: {
    gap: 10,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF0FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionTextBox: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  badgePill: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  badgePillText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },
});
