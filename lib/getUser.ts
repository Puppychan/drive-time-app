import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { auth } from '@/lib/firebase/firebase'
import { useRouter } from 'expo-router'

export function getUser() {
  const [user, setUser] = useState<any>()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (user === undefined) return

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        // router.refresh()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return user
}
