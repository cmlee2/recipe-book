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
    <header className="relative z-20 border-b border-warm-lighter bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tight text-bark">
              Recipe Book
            </span>
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 font-body text-sm font-medium text-bark-light transition-colors hover:bg-terra-wash hover:text-terra"
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
              <button className="rounded-full bg-terra px-5 py-2 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-terra-dark hover:shadow-md active:scale-[0.97]">
                Sign In
              </button>
            </SignInButton>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden rounded-lg p-2 text-bark-light hover:bg-cream-dark"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-warm-lighter bg-cream px-5 pb-4 pt-2 sm:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg py-2.5 px-3 font-body text-sm font-medium text-bark-light transition-colors hover:bg-terra-wash hover:text-terra"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
