import { SignUp } from '@clerk/clerk-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function SignUpPage() {
  const [searchParams] = useSearchParams()

  const redirectUrl = useMemo(
    () => searchParams.get('redirectUrl') || '/',
    [searchParams],
  )

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-4 py-24">
      <div className="flex w-full max-w-md justify-center">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl={`/sign-in?redirectUrl=${encodeURIComponent(redirectUrl)}`}
          afterSignUpUrl="/"
          forceRedirectUrl={redirectUrl}
        />
      </div>
    </main>
  )
}
