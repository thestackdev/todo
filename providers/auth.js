import NoAccess from '@/components/NoAccess'
import Spinner from '@/components/Spinner'

const { useSession } = require('next-auth/react')

export default function AuthProvider({ children }) {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') return <Spinner />

  if (!session) return <NoAccess />
  return children
}
