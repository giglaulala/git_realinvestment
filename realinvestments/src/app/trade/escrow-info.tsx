export function EscrowInfo() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Escrow status
        </p>
        <p className="mt-3 text-lg font-semibold">Bank-confirmed</p>
        <p className="mt-2 text-sm text-emerald-200/80">
          Funds settle into a licensed third-party escrow account. Release
          requires raise completion and lawyer sign-off.
        </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Refund safety
        </p>
        <p className="mt-3 text-lg font-semibold">Automatic reversals</p>
        <p className="mt-2 text-sm text-emerald-200/80">
          If the goal is missed, the escrow agent returns 100% of capital to the
          linked personal bank accounts instantly.
        </p>
      </div>
    </div>
  );
}

