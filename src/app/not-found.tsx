import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600"
      >
        Go Home
      </Link>
    </div>
  );
}
