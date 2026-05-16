"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Holds a "loading" signal true for at least `minMs` once it has flipped on,
 * so skeletons don't flash for sub-perceptual amounts of time. Resets per
 * loading cycle, so re-entering a loading state (e.g. switching the queried
 * date on a long-lived component) re-arms the floor.
 */
export function useMinLoading(loading: boolean, minMs = 500): boolean {
  const loadStartedAtRef = useRef<number | null>(
    loading ? (typeof performance !== "undefined" ? performance.now() : Date.now()) : null,
  );
  const [displayed, setDisplayed] = useState<boolean>(loading);

  useEffect(() => {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    if (loading) {
      if (loadStartedAtRef.current === null) loadStartedAtRef.current = now;
      setDisplayed(true);
      return;
    }
    if (loadStartedAtRef.current === null) {
      setDisplayed(false);
      return;
    }
    const elapsed = now - loadStartedAtRef.current;
    loadStartedAtRef.current = null;
    if (elapsed >= minMs) {
      setDisplayed(false);
      return;
    }
    const t = setTimeout(() => setDisplayed(false), minMs - elapsed);
    return () => clearTimeout(t);
  }, [loading, minMs]);

  return displayed;
}

/**
 * Local state that auto-syncs to a remote handler after a debounce.
 * - Updates the UI immediately.
 * - Calls `save` once activity stops for `delay` ms.
 * - If `value` changes from outside (e.g. another tab) while idle, the local
 *   state catches up.
 */
export function useAutosaved<T>(
  remoteValue: T,
  save: (next: T) => unknown,
  delay = 500,
) {
  const [local, setLocal] = useState<T>(remoteValue);
  const dirty = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedRef = useRef<T>(remoteValue);

  // Pull in remote updates only when we have no pending edits.
  useEffect(() => {
    if (!dirty.current) {
      setLocal(remoteValue);
      savedRef.current = remoteValue;
    }
  }, [remoteValue]);

  const setValue = (next: T) => {
    setLocal(next);
    dirty.current = true;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      void Promise.resolve(save(next)).finally(() => {
        savedRef.current = next;
        dirty.current = false;
      });
    }, delay);
  };

  // Flush on unmount.
  useEffect(() => {
    return () => {
      if (timer.current && dirty.current) {
        clearTimeout(timer.current);
        void save(local);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [local, setValue] as const;
}
