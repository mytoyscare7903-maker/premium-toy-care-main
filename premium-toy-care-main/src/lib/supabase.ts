import { createClient } from "@supabase/supabase-js";

export type DbReview = {
  id: string;
  name: string;
  date: string;
  stars: number;
  text: string;
  hidden: boolean;
  verified: boolean;
  created_at: string;
  image_url?: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Patch WebSocket for Node.js 20 (no native WebSocket) used by TanStack Start SSR
if (typeof globalThis.WebSocket === "undefined") {
  // Provide a no-op stub so Supabase Realtime doesn't throw during SSR.
  // Realtime subscriptions only work in the browser anyway.
  class NoopWebSocket {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;
    readyState = NoopWebSocket.CLOSED;
    constructor() { /* no-op */ }
    send() { /* no-op */ }
    close() { /* no-op */ }
    addEventListener() { /* no-op */ }
    removeEventListener() { /* no-op */ }
    dispatchEvent() { return false; }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).WebSocket = NoopWebSocket;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
