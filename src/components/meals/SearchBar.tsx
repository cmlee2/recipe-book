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
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-warm" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a recipe..."
          className="w-full rounded-xl border-0 bg-white py-3.5 pl-11 pr-4 font-body text-sm text-bark shadow-sm ring-1 ring-black/[0.06] placeholder:text-warm-light focus:outline-none focus:ring-2 focus:ring-terra/40"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-terra px-6 py-3.5 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-terra-dark hover:shadow-md active:scale-[0.97]"
      >
        Search
      </button>
    </form>
  );
}
