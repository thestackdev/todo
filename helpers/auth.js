import { getToken } from 'next-auth/jwt'

export const isAuthenticated = async (req) => {
  const token = await getToken({ req })

  if (!token) return false

  return token
}
