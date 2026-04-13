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
    { href: "/meals", label: "Recipes" },
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
    <header className="relative z-20 bg-white border-b border-border">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 h-16">
        <Link href="/" className="shrink-0">
          <span className="font-display text-[28px] font-bold text-bark">
            Recipe Book
          </span>
        </Link>

        {/* Nav links inline */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 font-body text-sm font-semibold text-bark-light transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden sm:block">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-warm" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes..."
                className="w-56 rounded-lg border border-border bg-white py-2 pl-9 pr-3 font-body text-sm text-bark placeholder:text-warm-light focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
          </form>

          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-lg bg-accent px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-accent-dark">
                Sign In
              </button>
            </SignInButton>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-bark"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-white px-5 pb-4 pt-2 lg:hidden">
          <form onSubmit={handleSearch} className="mb-3 sm:hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes..."
              className="w-full rounded-lg border border-border py-2.5 px-4 font-body text-sm text-bark placeholder:text-warm-light focus:border-accent focus:outline-none"
            />
          </form>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 font-body text-sm font-semibold text-bark-light"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
