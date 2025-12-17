'use client'
import { useState } from 'react'
import { PageContainer } from './components/page-container'
import { signout } from './server-actions/auth/signout'
import { Button } from '@/components/base/buttons/button'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const handleSignout = async () => {
    setIsLoading(true)
    const result = await signout()
    if (result && !result.success) {
      console.error('Signout error:', result.error)
      // TODO: show error message to the user
    }
    setIsLoading(false)
  }
  return (
    <PageContainer>
      <div className="text-primary text-center text-2xl font-bold">
        <p className="mb-4">Welcome to Bettermode</p>

        <Button color="secondary" onClick={handleSignout} isLoading={isLoading}>
          Signout
        </Button>
      </div>
    </PageContainer>
  )
}
