import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useWagmi } from './context/WagmiContext';
import { Wallet } from 'lucide-react-native';

export default function LandingPage() {
  const router = useRouter();
  const { connect, isConnected } = useWagmi();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    if (isConnected) {
      router.replace('/(tabs)/tokens');
    }
  }, [fadeAnim, isConnected, router]);

  const handleConnectWallet = async () => {
    try {
      await connect();
      router.replace('/(tabs)/wallet');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#f5f5f5', '#e0e0e0']}
      style={styles.container}
    >
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>ScrollnGo</Text>
        <Pressable
          style={({ pressed }) => [
            styles.connectButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleConnectWallet}
        >
          <Wallet size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Connect Wallet</Text>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 60,
    color: '#333',
    letterSpacing: 1,
  },
  connectButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#555',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 10,
  },
});