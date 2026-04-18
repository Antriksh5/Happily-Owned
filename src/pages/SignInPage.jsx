import { SignIn } from '@clerk/clerk-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function SignInPage() {
  const [searchParams] = useSearchParams()

  const redirectUrl = useMemo(
    () => searchParams.get('redirectUrl') || '/',
    [searchParams],
  )

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-4 py-24">
      <div className="flex w-full max-w-md justify-center">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl={`/sign-up?redirectUrl=${encodeURIComponent(redirectUrl)}`}
          afterSignInUrl="/"
          forceRedirectUrl={redirectUrl}
        />
      </div>
    </main>
  )
}
