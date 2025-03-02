import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bluetooth, RefreshCw } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

type Device = {
  id: string;
  name: string;
  signalStrength: 'strong' | 'medium' | 'weak';
};

const mockDevices: Device[] = [
  { id: '1', name: 'iPhone 13', signalStrength: 'strong' },
  { id: '2', name: 'MacBook Pro', signalStrength: 'strong' },
  { id: '3', name: 'AirPods Pro', signalStrength: 'medium' },
  { id: '4', name: 'Samsung Galaxy S21', signalStrength: 'medium' },
  { id: '5', name: 'iPad Pro', signalStrength: 'weak' },
  { id: '6', name: 'Bluetooth Speaker', signalStrength: 'weak' },
];

export default function DevicesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    rotation.value = withTiming(rotation.value + 360, {
      duration: 1000,
      easing: Easing.linear,
    });

    // Simulate refreshing the device list
    setTimeout(() => {
      // Shuffle the devices array to simulate a refresh
      setDevices([...devices].sort(() => Math.random() - 0.5));
      setRefreshing(false);
    }, 1500);
  }, [devices, rotation]);

  const handleManualRefresh = () => {
    onRefresh();
  };

  const getSignalIcon = (strength: string) => {
    switch (strength) {
      case 'strong':
        return '●●●';
      case 'medium':
        return '●●○';
      case 'weak':
        return '●○○';
      default:
        return '○○○';
    }
  };

  const getSignalColor = (strength: string) => {
    switch (strength) {
      case 'strong':
        return '#4CAF50';
      case 'medium':
        return '#FFC107';
      case 'weak':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const renderItem = ({ item }: { item: Device }) => (
    <Pressable
      style={({ pressed }) => [
        styles.deviceItem,
        pressed && styles.deviceItemPressed,
      ]}
    >
      <View style={styles.deviceInfo}>
        <Bluetooth size={24} color="#333" style={styles.deviceIcon} />
        <Text style={styles.deviceName}>{item.name}</Text>
      </View>
      <Text
        style={[
          styles.signalStrength,
          { color: getSignalColor(item.signalStrength) },
        ]}
      >
        {getSignalIcon(item.signalStrength)}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nearby Devices</Text>
          <Pressable
            style={({ pressed }) => [
              styles.refreshButton,
              pressed && styles.refreshButtonPressed,
            ]}
            onPress={handleManualRefresh}
          >
            <Animated.View style={animatedStyle}>
              <RefreshCw size={20} color="#333" />
            </Animated.View>
          </Pressable>
        </View>

        <FlatList
          data={devices}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No devices found</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  refreshButtonPressed: {
    backgroundColor: '#ddd',
  },
  listContent: {
    paddingBottom: 20,
  },
  deviceItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  deviceItemPressed: {
    backgroundColor: '#f9f9f9',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    marginRight: 12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  signalStrength: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});