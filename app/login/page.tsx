'use client'

import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const OAUTH_ERRORS: Record<string, string> = {
  OAuthAccountNotLinked:
    'This email is already registered with a password. Sign in with email instead.',
  OAuthSignin: 'Could not start Google sign-in. Try again.',
  OAuthCallback: 'Google sign-in failed. Try again.',
  Default: 'Something went wrong. Try again.',
}

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const justRegistered = params.get('registered') === '1'
  const oauthError = params.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoadingEmail(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoadingEmail(false)
    if (res?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  async function handleGoogle() {
    setLoadingGoogle(true)
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  const oauthErrorMsg = oauthError ? (OAUTH_ERRORS[oauthError] ?? OAUTH_ERRORS.Default) : null

  return (
    <div className="min-h-screen bg-[#060c1a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <svg
            viewBox="0 0 20 20"
            className="w-7 h-7 fill-current flex-shrink-0"
            style={{ color: '#f5a623', filter: 'drop-shadow(0 0 8px rgba(245,166,35,0.8))' }}
          >
            <path d="M10 2L12.4 7.5H18L13.3 11l1.9 5.8L10 13.5l-5.2 3.3L6.7 11 2 7.5h5.6z" />
          </svg>
          <span
            className="font-black text-xl tracking-wide text-white"
            style={{ textShadow: '0 0 20px rgba(139,92,246,0.6)' }}
          >
            MLBB Counter
          </span>
        </div>

        {/* Card */}
        <div
          className="bg-[#0d1624] border border-purple-900/40 rounded-2xl p-8"
          style={{ boxShadow: '0 0 40px rgba(139,92,246,0.08)' }}
        >
          <h1 className="text-xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

          {justRegistered && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
              Account created — you can now sign in.
            </div>
          )}
          {oauthErrorMsg && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
              {oauthErrorMsg}
            </div>
          )}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
              {error}
            </div>
          )}

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loadingGoogle || loadingEmail}
            className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl text-sm font-medium text-gray-200 border border-[#1e2d55] bg-[#080e1e] hover:border-purple-700/60 hover:bg-[#0d1624] transition-all mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingGoogle ? (
              <span className="w-4 h-4 border-2 border-gray-500 border-t-gray-200 rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {loadingGoogle ? 'Redirecting…' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#1e2d55]" />
            <span className="text-xs text-gray-600">or</span>
            <div className="flex-1 h-px bg-[#1e2d55]" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-[#080e1e] border border-[#1e2d55] rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#080e1e] border border-[#1e2d55] rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loadingEmail || loadingGoogle}
              className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                boxShadow: loadingEmail ? 'none' : '0 0 20px rgba(124,58,237,0.4)',
              }}
            >
              {loadingEmail ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-5">
          No account?{' '}
          <Link
            href="/register"
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Create one
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600 mt-3">
          <Link href="/" className="text-gray-600 hover:text-gray-400 transition-colors">
            ← Back to counter
          </Link>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
