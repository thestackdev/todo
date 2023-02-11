import Navbar from '@/components/Navbar'
import NoAccess from '@/components/NoAccess'
import Sidebar from '@/components/Sidebar'
import Spinner from '@/components/Spinner'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import { SessionProvider, useSession } from 'next-auth/react'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [sidebarOpened, setSidebarOpened] = useState(false)

  return (
    <main className={inter.className}>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <Navbar
              sidebarOpened={sidebarOpened}
              setSidebarOpened={setSidebarOpened}
            />
            <Sidebar sidebarOpened={sidebarOpened}>
              <Component {...pageProps} />
            </Sidebar>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </main>
  )
}

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') return <Spinner />

  if (!session) return <NoAccess />
  return children
}
