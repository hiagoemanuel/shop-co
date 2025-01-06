'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export const LogOutButton = () => {
  return (
    <Button
      className="bg-red-600 hover:bg-red-600/80 transition-colors h-10 px-4 py-2 text-sm font-medium rounded-md"
      onClick={() => signOut()}
    >
      Log out
    </Button>
  )
}
