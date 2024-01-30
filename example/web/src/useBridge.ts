import type { Bridge, BridgeStore, ExtractStore } from "@webview-bridge/web";
import { useSyncExternalStore } from "react";

export function useBridge<T extends Bridge>(
  store: BridgeStore<T>,
): ExtractStore<BridgeStore<T>>;

export function useBridge<
  T extends Bridge,
  U extends ExtractStore<BridgeStore<T>>,
  V,
>(store: BridgeStore<T>, selector?: (state: U) => V): V;

export function useBridge<
  T extends Bridge,
  U extends ExtractStore<BridgeStore<T>>,
  V,
>(store: BridgeStore<T>, selector?: (state: U) => V): V {
  const getSnapshot = () =>
    selector?.(store.getState() as U) ?? store.getState();
  return useSyncExternalStore(store.subscribe, getSnapshot) as V;
}
