"use client";

import Link from "next/link";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Recipe Book
          </Link>
          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="/meals"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Search
            </Link>
            <Link
              href="/categories"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Categories
            </Link>
            {isSignedIn && (
              <>
                <Link
                  href="/favorites"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Favorites
                </Link>
                <Link
                  href="/meal-plan"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Meal Plan
                </Link>
                <Link
                  href="/my-recipes"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  My Recipes
                </Link>
              </>
            )}
            <Link
              href="/community"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Community
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </nav>
    </header>
  );
}
