'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { type ReactNode } from 'react';

// Import base chain with proper typing
const baseChain = {
  id: 8453,
  name: 'Base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
  },
} as const;

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      chain={baseChain}
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'cdp_demo_key'}
    >
      {children}
    </MiniKitProvider>
  );
}
