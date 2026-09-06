import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { BottomNavBar } from './src/components/BottomNavBar';
import { HomeScreen } from './src/screens/HomeScreen';
import { ShopScreen } from './src/screens/ShopScreen';
import { EmiDuesScreen } from './src/screens/EmiDuesScreen';
import { LimitScreen } from './src/screens/LimitScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { MarketplaceScreen } from './src/screens/MarketplaceScreen';
import { ProductDetailsScreen } from './src/screens/ProductDetailsScreen';
import { RootScreen, BottomTab } from './src/types';
import { Colors } from './src/theme/colors';

export default function App() {
  const [activeTab, setActiveTab] = useState<BottomTab>('shop');
  const [screenStack, setScreenStack] = useState<RootScreen[]>([{ name: 'Shop' }]);

  const currentScreen = screenStack[screenStack.length - 1];

  const pushScreen = (screen: RootScreen) => {
    setScreenStack((prev) => [...prev, screen]);
  };

  const popScreen = () => {
    if (screenStack.length > 1) {
      setScreenStack((prev) => prev.slice(0, -1));
    }
  };

  const handleTabPress = (tab: BottomTab) => {
    setActiveTab(tab);
    if (tab === 'shop') {
      setScreenStack([{ name: 'Shop' }]);
    }
  };

  // Render content based on active bottom tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onGoToShop={() => setActiveTab('shop')} />;

      case 'portfolio':
        return <EmiDuesScreen onCheckEligibility={() => setActiveTab('shop')} />;

      case 'account':
        return <LimitScreen onFetchPortfolio={() => setActiveTab('shop')} />;

      case 'profile':
        return <ProfileScreen />;

      case 'shop':
      default:
        // Inside Shop Tab: Handle nested screen stack
        switch (currentScreen.name) {
          case 'Shop':
            return (
              <ShopScreen
                onNavigateToMarketplace={() => pushScreen({ name: 'Marketplace' })}
                onSelectProduct={(productId) =>
                  pushScreen({ name: 'ProductDetails', productId })
                }
              />
            );

          case 'Marketplace':
            return (
              <MarketplaceScreen
                onBack={popScreen}
                onSelectProduct={(productId) =>
                  pushScreen({ name: 'ProductDetails', productId })
                }
              />
            );

          case 'ProductDetails':
            return (
              <ProductDetailsScreen
                productId={currentScreen.productId}
                onBack={popScreen}
                onOrderSuccessReturn={() => {
                  setScreenStack([{ name: 'Shop' }, { name: 'Marketplace' }]);
                }}
              />
            );

          default:
            return (
              <ShopScreen
                onNavigateToMarketplace={() => pushScreen({ name: 'Marketplace' })}
                onSelectProduct={(productId) =>
                  pushScreen({ name: 'ProductDetails', productId })
                }
              />
            );
        }
    }
  };

  // Only show floating bottom nav bar when not in deep product details
  const showBottomNav = currentScreen.name !== 'ProductDetails';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <View style={styles.appContainer}>
        {renderTabContent()}
        {showBottomNav && (
          <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    backgroundColor: Colors.background,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },
});
