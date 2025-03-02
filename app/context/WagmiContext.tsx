import React, { createContext, useContext, ReactNode } from 'react';
import { Platform } from 'react-native';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

// Create a mock context for non-web platforms
const MockWagmiContext = createContext<{
  connect: () => Promise<{ address: string }>;
  disconnect: () => void;
  isConnected: boolean;
  address: string | null;
}>({
  connect: async () => ({ address: '0x1234...5678' }),
  disconnect: () => {},
  isConnected: false,
  address: null,
});

export const useWagmi = () => useContext(MockWagmiContext);

// Web-only wagmi configuration
const config = Platform.OS === 'web' 
  ? createConfig({
      chains: [mainnet],
      transports: {
        [mainnet.id]: http(),
      },
    })
  : null;

// Provider component
export function WagmiConfig({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [address, setAddress] = React.useState<string | null>(null);

  // Mock implementation for demo purposes
  const connect = async () => {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockAddress = '0x1234...5678';
    setAddress(mockAddress);
    setIsConnected(true);
    return { address: mockAddress };
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
  };

  const contextValue = {
    connect,
    disconnect,
    isConnected,
    address,
  };

  return (
    <MockWagmiContext.Provider value={contextValue}>
      {children}
    </MockWagmiContext.Provider>
  );
}