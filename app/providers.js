'use client'

import { AuthProvider } from '@/context/AuthContext'

// Wrapper de providers client-side, usado no RootLayout (server component).
export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}
