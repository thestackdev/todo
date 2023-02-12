import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import AuthProvider from '@/providers/auth'
import StateProvider from '@/providers/state'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={inter.className}>
      <SessionProvider session={session}>
        {Component.auth ? (
          <AuthProvider>
            <StateProvider>
              <Navbar />
              <Sidebar>
                <Component {...pageProps} />
              </Sidebar>
            </StateProvider>
          </AuthProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </main>
  )
}
