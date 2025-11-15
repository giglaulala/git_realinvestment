import Link from "next/link";

export const metadata = {
  title: "Real Investment | Secure Login",
  description:
    "Authenticate with your Real Investment desk ID to access portfolio analytics and trade execution.",
};

const safeguards = [
  "Enterprise SSO with hardware key fallback",
  "Device fingerprinting and IP reputation scoring",
  "Session isolation with auto-expiry at 15 minutes idle",
];

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 px-6 pb-24 pt-16 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-20 h-[22rem] w-[22rem] rounded-full bg-emerald-400/25 blur-[160px]" />
        <div className="absolute right-[-10rem] top-[28rem] h-[18rem] w-[18rem] rounded-full bg-lime-300/20 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-12">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/70">
            Identity-gated access
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Authenticate with your trading ID
          </h1>
          <p className="max-w-2xl text-base text-white/70 sm:text-lg">
            Enter the unique Real Investment desk ID issued to your trading organisation.
            Your credentials stay encrypted client-side until the zero-knowledge handoff
            completes with our custody partners.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form className="rounded-[2.5rem] border border-white/12 bg-white/6 p-8 backdrop-blur">
            <div>
              <label
                htmlFor="desk-id"
                className="text-xs uppercase tracking-[0.35em] text-white/50"
              >
                Desk ID credential
              </label>
              <input
                id="desk-id"
                name="desk-id"
                placeholder="RI-0019-AX45"
                required
                pattern="^[A-Za-z0-9\\-]{6,}$"
                className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white transition placeholder:text-white/30 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="passphrase"
                  className="text-xs uppercase tracking-[0.35em] text-white/50"
                >
                  Passphrase
                </label>
                <input
                  id="passphrase"
                  name="passphrase"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white transition placeholder:text-white/30 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
                />
              </div>
              <div>
                <label
                  htmlFor="otp"
                  className="text-xs uppercase tracking-[0.35em] text-white/50"
                >
                  Hardware token OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  inputMode="numeric"
                  pattern="^[0-9]{6}$"
                  placeholder="000000"
                  required
                  className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white transition placeholder:text-white/30 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-200 to-emerald-500 px-8 py-3 text-sm font-semibold text-black shadow-[0_0_45px_rgba(134,239,172,0.48)] transition hover:scale-[1.01]"
            >
              Verify and enter
            </button>

            <p className="mt-4 text-xs text-white/50">
              By continuing you agree to the Real Investment trading terms and certify that you
              are authorised under your organisation&apos;s compliance program.
            </p>
          </form>

          <aside className="flex flex-col gap-6">
            <div className="rounded-[2.2rem] border border-white/12 bg-white/6 p-6 backdrop-blur">
              <h2 className="text-lg font-semibold text-white">Security envelope</h2>
              <ul className="mt-4 space-y-3">
                {safeguards.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-white/70"
                  >
                    <span className="mt-1 h-1.5 w-6 rounded-full bg-emerald-300/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2.2rem] border border-emerald-200/40 bg-emerald-400/15 p-6 text-neutral-900 shadow-[0_30px_80px_rgba(134,239,172,0.4)]">
              <h2 className="text-lg font-semibold text-neutral-900">Need elevated access?</h2>
              <p className="mt-2 text-sm text-neutral-900/80">
                Provision new desk IDs, manage rotating keys, or configure just-in-time access
                policies directly from the command console.
              </p>
              <Link
                href="/portfolio"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
              >
                Contact admin desk
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}


