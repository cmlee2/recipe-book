"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/meals?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="relative flex-1">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a recipe..."
          className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 font-body text-sm text-bark placeholder:text-warm-light focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-accent px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        Search
      </button>
    </form>
  );
}
