'use client'

import '@/styles/globals.css';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi'
import { config } from '../createConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient() 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}