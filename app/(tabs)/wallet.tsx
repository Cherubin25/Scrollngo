import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useWagmi } from '../context/WagmiContext';
import { SafeAreaView } from 'react-native-safe-area-context';

type NewsItem = {
  id: string;
  title: string;
  time: string;
  summary: string;
};

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Ethereum Reaches New All-Time High',
    time: '2 hours ago',
    summary: 'Ethereum has surpassed its previous record, reaching a new all-time high of $5,000.'
  },
  {
    id: '2',
    title: 'Major DeFi Protocol Announces Upgrade',
    time: '5 hours ago',
    summary: 'A leading DeFi protocol has announced a major upgrade that will improve scalability and reduce gas fees.'
  },
  {
    id: '3',
    title: 'New NFT Collection Sells Out in Minutes',
    time: '1 day ago',
    summary: 'A highly anticipated NFT collection sold out within minutes of launch, generating over $10 million in sales.'
  },
  {
    id: '4',
    title: 'Bitcoin Mining Becomes More Sustainable',
    time: '2 days ago',
    summary: 'Bitcoin mining operations are increasingly turning to renewable energy sources, addressing environmental concerns.'
  },
];

export default function WalletScreen() {
  const { address } = useWagmi();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Wallet Overview</Text>
        </View>
        
        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>Wallet Address</Text>
          <Text style={styles.walletAddress}>{address || '0x1234...5678'}</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceAmount}>2,450.75 ETH</Text>
          </View>
        </View>

        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>Crypto News</Text>
          {mockNews.map((item) => (
            <View key={item.id} style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsTime}>{item.time}</Text>
              </View>
              <Text style={styles.newsSummary}>{item.summary}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  },
  contentContainer: {
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
  walletCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  walletLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  walletAddress: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  balanceContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
  },
  newsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  newsTime: {
    fontSize: 12,
    color: '#999',
  },
  newsSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});