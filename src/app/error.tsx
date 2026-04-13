"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-5">
      <div className="text-5xl mb-4">😵</div>
      <h1 className="font-display text-2xl font-bold text-bark">Something went wrong</h1>
      <p className="mt-1 font-body text-sm text-warm">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-accent px-6 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-dark hover:shadow-md"
      >
        Try Again
      </button>
    </div>
  );
}
