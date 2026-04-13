import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-5">
      <p className="font-display text-7xl font-bold text-warm-lighter">404</p>
      <p className="mt-3 font-display text-xl text-bark">Page not found</p>
      <p className="mt-1 font-body text-sm text-warm">The recipe you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-terra px-6 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-terra-dark hover:shadow-md"
      >
        Go Home
      </Link>
    </div>
  );
}
