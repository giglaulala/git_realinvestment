export function Footer() {
  return (
    <footer className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-sm text-white/60 backdrop-blur md:flex-row">
      <p>
        © {new Date().getFullYear()} Real Investment Group. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a href="#" className="transition hover:text-white">
          Status
        </a>
        <a href="#" className="transition hover:text-white">
          Security
        </a>
        <a href="#" className="transition hover:text-white">
          Careers
        </a>
      </div>
    </footer>
  );
}
