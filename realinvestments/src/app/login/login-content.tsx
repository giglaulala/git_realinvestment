"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { UploadCloud, UserCheck } from "lucide-react"

import { useAuth } from "@/components/providers/auth-provider"

type ViewMode = "login" | "signup"

type AuthFormState = {
  name: string
  email: string
  password: string
  nationalIdFile?: File
}

const DEFAULT_STATE: AuthFormState = {
  name: "",
  email: "",
  password: "",
  nationalIdFile: undefined,
}

export function LoginContent() {
  const { isAuthenticated, user, login, logout } = useAuth()
  const router = useRouter()
  const [mode, setMode] = useState<ViewMode>("login")
  const [formState, setFormState] = useState<AuthFormState>(DEFAULT_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)

  const isSignup = mode === "signup"

  const title = isSignup
    ? "Create your investor account"
    : "Sign in to Real Investment"
  const subtitle = isSignup
    ? "Complete onboarding to access escrow-backed property raises and your dashboard."
    : "Log in with your email and password to review SPV holdings and payouts."

  const toggleMode = useCallback(() => {
    setMode((current) => (current === "login" ? "signup" : "login"))
    setFormState(DEFAULT_STATE)
    setPreviewUrl(undefined)
  }, [])

  const handleChange = useCallback(
    (key: keyof AuthFormState, value: string | File | undefined) => {
      setFormState((previous) => ({
        ...previous,
        [key]: value,
      }))
    },
    []
  )

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      handleChange("nationalIdFile", file)

      if (file) {
        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl((current) => {
          if (current) {
            URL.revokeObjectURL(current)
          }
          return objectUrl
        })
      } else if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(undefined)
      }
    },
    [handleChange, previewUrl]
  )

  const hasValidSignup =
    formState.name.trim().length > 1 &&
    formState.email.trim().length > 5 &&
    formState.password.trim().length >= 8 &&
    !!formState.nationalIdFile

  const hasValidLogin =
    formState.email.trim().length > 5 && formState.password.trim().length >= 8

  const isFormValid = isSignup ? hasValidSignup : hasValidLogin

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!isFormValid) {
        return
      }

      setIsSubmitting(true)
      try {
        await login({
          name: isSignup ? formState.name : undefined,
          email: formState.email,
          password: formState.password,
          nationalIdFile: isSignup ? formState.nationalIdFile : undefined,
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formState, isFormValid, isSignup, login]
  )

  const authSummary = useMemo(() => {
    if (!user) return null
    return {
      initials: user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      name: user.name,
      email: user.email,
      nationalIdUrl: user.nationalIdUrl,
    }
  }, [user])

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <div className="relative min-h-screen bg-neutral-950 px-6 pb-24 pt-16 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-20 h-[22rem] w-[22rem] rounded-full bg-emerald-400/25 blur-[160px]" />
        <div className="absolute right-[-10rem] top-[28rem] h-[18rem] w-[18rem] rounded-full bg-lime-300/20 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/70">
            Investor access
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base text-white/70 sm:text-lg">
            {subtitle}
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2.5rem] border border-white/12 bg-white/6 p-8 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
                  {isSignup ? "Create profile" : "Secure login"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {isSignup ? "Link your identity" : "Welcome back"}
                </h2>
              </div>
              <button
                type="button"
                onClick={toggleMode}
                className="text-sm font-medium text-emerald-200/80 transition hover:text-emerald-100"
              >
                {isSignup
                  ? "Already onboarded? Log in"
                  : "New here? Create account"}
              </button>
            </div>

            {isSignup && (
              <div className="mt-6">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-[0.35em] text-white/50"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Nino Beridze"
                  required
                  value={formState.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white transition placeholder:text-white/30 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
                />
              </div>
            )}

            <div className="mt-6">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.35em] text-white/50"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.ge"
                required
                value={formState.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white transition placeholder:text-white/30 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.35em] text-white/50"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={formState.password}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
                className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white transition placeholder:text-white/30 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
              />
            </div>

            {isSignup && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Georgian national ID
                </p>
                <label
                  htmlFor="national-id"
                  className="mt-3 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 bg-black/30 px-6 py-8 text-center transition hover:border-emerald-200/60 hover:bg-black/40"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="National ID preview"
                      className="h-32 w-full max-w-xs rounded-xl border border-white/10 object-cover"
                    />
                  ) : (
                    <>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-emerald-200">
                        <UploadCloud className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium text-white">
                        Drop ID image or click to upload
                      </span>
                      <span className="text-xs text-white/50">
                        JPG or PNG, up to 10MB
                      </span>
                    </>
                  )}
                  <input
                    id="national-id"
                    name="national-id"
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="mt-8 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 px-8 py-3 text-sm font-semibold text-black shadow-[0_0_45px_rgba(134,239,172,0.48)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting
                ? "Processing..."
                : isSignup
                ? "Complete onboarding"
                : "Enter dashboard"}
            </button>

            <p className="mt-4 text-xs text-white/50">
              {isSignup
                ? "Your ID is used solely for single-property SPV onboarding and remains encrypted."
                : "Forgot password? Contact compliance to reset your credentials."}
            </p>
          </form>

          <aside className="flex flex-col gap-6">
            <div className="rounded-[2.2rem] border border-white/12 bg-white/6 p-6 backdrop-blur">
              <h2 className="text-lg font-semibold text-white">
                Security envelope
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-6 rounded-full bg-emerald-300/70" />
                  <span>
                    Mandatory Georgian ID verification before escrow access
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-6 rounded-full bg-emerald-300/70" />
                  <span>
                    Linked personal bank accounts for payouts and refunds
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-6 rounded-full bg-emerald-300/70" />
                  <span>
                    Sessions auto-expire after 15 minutes of inactivity
                  </span>
                </li>
              </ul>
            </div>

            {isAuthenticated && authSummary && (
              <div className="rounded-[2.2rem] border border-white/12 bg-white/6 p-6 backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/30 to-emerald-500/30 text-base font-semibold text-emerald-100">
                    {authSummary.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Logged in as {authSummary.name}
                    </p>
                    <p className="text-xs text-white/50">{authSummary.email}</p>
                  </div>
                </div>
                {authSummary.nationalIdUrl && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                      National ID on file
                    </p>
                    <img
                      src={authSummary.nationalIdUrl}
                      alt="Uploaded national ID"
                      className="mt-3 h-28 w-full rounded-xl border border-white/10 object-cover"
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <UserCheck className="h-4 w-4" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            )}
          </aside>
        </section>
      </div>
    </div>
  )
}
