"use client";

import type { PublicSearchHistoryItem } from "@/lib/search/public-search.types";
import * as React from "react";

/**
 * Cache LRU simples baseado em Map (mantém ordem de inserção).
 * Quando atinge o limite, remove a entrada mais antiga (least recently used).
 *
 * @param maxSize - Número máximo de entradas no cache
 */
export function useLruCache<TValue>(maxSize = 20) {
  const cacheRef = React.useRef<Map<string, TValue>>(new Map());

  const get = React.useCallback((key: string): TValue | undefined => {
    const cache = cacheRef.current;
    if (!cache.has(key)) return undefined;

    // Move para o final (mais recente)
    const value = cache.get(key)!;
    cache.delete(key);
    cache.set(key, value);

    return value;
  }, []);

  const set = React.useCallback(
    (key: string, value: TValue): void => {
      const cache = cacheRef.current;

      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= maxSize) {
        // Remove o mais antigo (primeiro do Map)
        const firstKey = cache.keys().next().value;
        if (firstKey !== undefined) cache.delete(firstKey);
      }

      cache.set(key, value);
    },
    [maxSize],
  );

  const has = React.useCallback(
    (key: string): boolean => cacheRef.current.has(key),
    [],
  );

  const invalidate = React.useCallback((key: string): void => {
    cacheRef.current.delete(key);
  }, []);

  const clear = React.useCallback((): void => {
    cacheRef.current.clear();
  }, []);

  return { get, set, has, invalidate, clear } as const;
}

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
