"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mt-2 text-gray-600">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600"
      >
        Try Again
      </button>
    </div>
  );
}
