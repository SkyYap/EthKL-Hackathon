'use client'

import '@/styles/globals.css';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi'
import { config } from '../createConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActorProvider, AgentProvider } from '@ic-reactor/react'
// import { idlFactory, canisterId } from './declarations/backend';

const queryClient = new QueryClient() 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          {/* <AgentProvider withProcessEnv> */}
            {/* <ActorProvider idlFactory={idlFactory} canisterId={canisterId}> */}
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            {/* </ActorProvider> */}
          {/* </AgentProvider> */}
        </WagmiProvider>
      </body>
    </html>
  )
}