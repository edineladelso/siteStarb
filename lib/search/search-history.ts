"use client";

import * as React from "react";
import type { PublicSearchHistoryItem } from "./public-search.types";

const STORAGE_KEY = "starb:search-history";
const MAX_HISTORY = 8;

// ─── Funções puras ─────────────────────────────────────────────────────────────

function readHistory(): PublicSearchHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PublicSearchHistoryItem[];
  } catch {
    return [];
  }
}

function writeHistory(items: PublicSearchHistoryItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Silencia erros de quota
  }
}

export function addToHistory(query: string): void {
  if (!query || query.trim().length < 2) return;

  const trimmed = query.trim();
  const current = readHistory().filter(
    (item) => item.query.toLowerCase() !== trimmed.toLowerCase(),
  );

  const updated: PublicSearchHistoryItem[] = [
    { query: trimmed, at: Date.now() },
    ...current,
  ].slice(0, MAX_HISTORY);

  writeHistory(updated);
}

export function clearHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useSearchHistory() {
  const [history, setHistory] = React.useState<PublicSearchHistoryItem[]>([]);

  React.useEffect(() => {
    setHistory(readHistory());
  }, []);

  const add = React.useCallback((query: string) => {
    addToHistory(query);
    setHistory(readHistory());
  }, []);

  const clear = React.useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return { history, add, clear } as const;
}