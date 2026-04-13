"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/meals", label: "Search" },
    { href: "/categories", label: "Categories" },
    ...(isSignedIn
      ? [
          { href: "/favorites", label: "Favorites" },
          { href: "/meal-plan", label: "Meal Plan" },
          { href: "/my-recipes", label: "My Recipes" },
        ]
      : []),
    { href: "/community", label: "Community" },
  ];

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Recipe Book
          </Link>
          <div className="hidden items-center gap-6 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                Sign In
              </button>
            </SignInButton>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 px-4 pb-3 sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
