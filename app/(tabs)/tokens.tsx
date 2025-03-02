import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';

type Token = {
  id: string;
  name: string;
  chain: string;
  amount: string;
  symbol: string;
};

const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Ethereum',
    chain: 'Ethereum Mainnet',
    amount: '12.45',
    symbol: 'ETH',
  },
  {
    id: '2',
    name: 'Bitcoin',
    chain: 'Bitcoin',
    amount: '0.85',
    symbol: 'BTC',
  },
  {
    id: '3',
    name: 'Solana',
    chain: 'Solana',
    amount: '145.32',
    symbol: 'SOL',
  },
  {
    id: '4',
    name: 'Polygon',
    chain: 'Polygon',
    amount: '2,500.00',
    symbol: 'MATIC',
  },
  {
    id: '5',
    name: 'Cardano',
    chain: 'Cardano',
    amount: '3,200.75',
    symbol: 'ADA',
  },
  {
    id: '6',
    name: 'Avalanche',
    chain: 'Avalanche',
    amount: '78.50',
    symbol: 'AVAX',
  },
];

export default function TokensScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const handleConvertPress = (token: Token) => {
    setSelectedToken(token);
    setModalVisible(true);
  };

  const handleConfirmConversion = () => {
    // Here you would implement the actual conversion logic
    setModalVisible(false);
    setSelectedToken(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Token Own</Text>
        </View>

        <ScrollView style={styles.tokenList}>
          {mockTokens.map((token) => (
            <View key={token.id} style={styles.tokenCard}>
              <View style={styles.tokenInfo}>
                <Text style={styles.tokenName}>{token.name}</Text>
                <Text style={styles.tokenChain}>{token.chain}</Text>
                <View style={styles.tokenAmountContainer}>
                  <Text style={styles.tokenAmount}>
                    {token.amount} <Text style={styles.tokenSymbol}>{token.symbol}</Text>
                  </Text>
                </View>
              </View>
              <Pressable
                style={({ pressed }) => [
                  styles.convertButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => handleConvertPress(token)}
              >
                <Text style={styles.convertButtonText}>Convert</Text>
                <ArrowRight size={16} color="#fff" style={styles.convertButtonIcon} />
              </Pressable>
            </View>
          ))}
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Conversion</Text>
              {selectedToken && (
                <Text style={styles.modalText}>
                  Are you sure you want to convert {selectedToken.amount} {selectedToken.symbol} to in-app currency?
                </Text>
              )}
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handleConfirmConversion}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  tokenList: {
    flex: 1,
  },
  tokenCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tokenChain: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  tokenAmountContainer: {
    marginTop: 4,
  },
  tokenAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  convertButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#555',
    transform: [{ scale: 0.98 }],
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  convertButtonIcon: {
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#333',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});