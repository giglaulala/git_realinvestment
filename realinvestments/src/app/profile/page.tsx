import Link from "next/link";

export const metadata = {
  title: "Real Investment | Profile",
  description:
    "Review your Real Investment investor profile, compliance status, and linked bank accounts in one secure place.",
};

const profile = {
  name: "Nino Beridze",
  role: "Fractional investor",
  deskId: "INV-0197-GE",
  location: "Tbilisi • GMT+4",
  avatarInitials: "NB",
};

const teams = [
  { name: "Tbilisi Apt #1 LLC", status: "Shareholder", members: 42 },
  { name: "Seaside Residences LLC", status: "Shareholder", members: 27 },
  { name: "Riverside Lofts LLC", status: "Pending", members: 18 },
];

const sessions = [
  { device: "MacBook Air • Safari", location: "Tbilisi", time: "Active now" },
  {
    device: "iPhone • Real Investment App",
    location: "Batumi",
    time: "Today, 09:14",
  },
  {
    device: "ThinkPad • Chrome",
    location: "Kutaisi",
    time: "Yesterday, 22:48",
  },
];

const preferences = [
  { label: "KYC verification", value: "Georgian ID • 2025-02-04" },
  { label: "Linked bank", value: "TBC Bank • •• 1189" },
  { label: "Notification tier", value: "Funding windows + payout receipts" },
];

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 px-6 pb-24 pt-16 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-13rem] top-24 h-[21rem] w-[21rem] rounded-full bg-emerald-400/20 blur-[150px]" />
        <div className="absolute right-[-10rem] top-[30rem] h-[18rem] w-[18rem] rounded-full bg-lime-300/18 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-6 rounded-[2.5rem] border border-white/12 bg-white/6 p-8 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/40 to-emerald-500/40 text-xl font-semibold text-emerald-100">
                {profile.avatarInitials}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-200/80">
                  Investor ID {profile.deskId}
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {profile.name}
                </h1>
                <p className="text-sm text-white/60">
                  {profile.role} • {profile.location}
                </p>
              </div>
            </div>
            <Link
              href="/login"
              className="rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Manage identity
            </Link>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="grid gap-4 text-sm text-white/70 sm:grid-cols-3">
            {preferences.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-black/35 p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-white/12 bg-white/6 p-8 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">SPV memberships</h2>
                <p className="mt-1 text-sm text-white/60">
                  Properties you co-own and the current shareholder counts.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/15 px-5 py-2 text-xs font-medium text-white/80 transition hover:border-white/40 hover:text-white"
              >
                View holdings
              </Link>
            </div>

            <ul className="mt-6 space-y-3">
              {teams.map((team) => (
                <li
                  key={team.name}
                  className="flex items-center justify-between rounded-2xl border border-white/12 bg-black/35 px-5 py-4"
                >
                  <div>
                    <p className="text-base font-semibold text-white">
                      {team.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                      {team.members} members
                    </p>
                  </div>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-200/80">
                    {team.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-[2.2rem] border border-white/12 bg-white/6 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Recent sessions
                </h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/50">
                  Live
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {sessions.map((session) => (
                  <li
                    key={`${session.device}-${session.time}`}
                    className="rounded-2xl border border-white/12 bg-black/35 p-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {session.device}
                    </p>
                    <p className="text-xs text-white/50">
                      {session.location} • {session.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2.2rem] border border-emerald-200/40 bg-emerald-400/18 p-6 text-white shadow-[0_30px_80px_rgba(134,239,172,0.4)]">
              <h3 className="text-lg font-semibold text-white">
                Need to update compliance?
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Add a new Georgian bank account, refresh your KYC documents, or
                appoint a proxy investor. Our compliance team responds within
                one business day.
              </p>
              <Link
                href="/trade"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
              >
                Contact compliance
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
