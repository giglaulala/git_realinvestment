import Link from "next/link";

export type RoundUpdate = {
  title: string;
  body: string;
};

type RoundUpdatesProps = {
  updates: RoundUpdate[];
};

export function RoundUpdates({ updates }: RoundUpdatesProps) {
  return (
    <div className="mt-6 w-full rounded-[2rem] border border-emerald-200/40 bg-emerald-400/15 p-6 text-white shadow-[0_30px_80px_rgba(134,239,172,0.4)]">
      <h3 className="text-lg font-semibold text-white">Round updates</h3>
      <ul className="mt-4 space-y-4 text-sm text-white/80">
        {updates.map((update) => (
          <li
            key={update.title}
            className="w-full rounded-xl border border-white/40 bg-white/10 p-4"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              {update.title}
            </p>
            <p className="mt-2 text-sm text-white/80">{update.body}</p>
          </li>
        ))}
      </ul>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
      >
        Review my positions
      </Link>
    </div>
  );
}

