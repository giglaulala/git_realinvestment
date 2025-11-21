import Link from "next/link";

export function TradeHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/70">
          Escrow-backed raises
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Commit to fractional ownership
        </h1>
        <p className="mt-3 max-w-2xl text-base text-white/70 sm:text-lg">
          Review active SPVs, pass compliance, and lock your capital into
          escrow—funds move straight to the property&apos;s company once the goal
          is reached, or return to your bank account if it isn&apos;t.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="self-start rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
      >
        View my holdings
      </Link>
    </header>
  );
}

