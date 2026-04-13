"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/meals?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  }

  const navLinks = [
    { href: "/meals", label: "What to Cook" },
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
    <header className="relative z-20 bg-white">
      {/* Top bar */}
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="shrink-0">
          <span className="font-display text-3xl font-bold tracking-tight text-bark">
            Recipe Book
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden sm:block flex-1 max-w-md mx-6">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-warm" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What would you like to cook?"
              className="w-full rounded-full border border-warm-lighter bg-white py-2 pl-10 pr-4 font-body text-sm text-bark placeholder:text-warm-light focus:border-bark focus:outline-none"
            />
          </div>
        </form>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="rounded-full border border-bark px-5 py-2 font-body text-sm font-semibold text-bark transition-colors hover:bg-bark hover:text-white">
                  Log In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="hidden sm:block rounded-full bg-terra px-5 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-terra-dark">
                  Create free account
                </button>
              </SignInButton>
            </>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 text-bark"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Nav links */}
      <nav className="hidden sm:block border-t border-warm-lighter">
        <div className="mx-auto flex max-w-[1280px] items-center gap-1 px-5 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 font-body text-[15px] font-semibold text-bark transition-colors hover:text-terra"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-warm-lighter bg-white px-5 pb-4 pt-2 sm:hidden">
          <form onSubmit={handleSearch} className="mb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What would you like to cook?"
              className="w-full rounded-full border border-warm-lighter py-2.5 px-4 font-body text-sm text-bark placeholder:text-warm-light focus:border-bark focus:outline-none"
            />
          </form>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 font-body text-[15px] font-semibold text-bark"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
