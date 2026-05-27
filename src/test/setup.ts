import { vi } from 'vitest';

// jsdom doesn't ship IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as unknown as typeof IntersectionObserver;

// Minimal chrome API surface needed by the source files
const storageData: Record<string, unknown> = {};

(global as unknown as Record<string, unknown>).chrome = {
  storage: {
    sync: {
      get: vi.fn((key: string | null, cb: (r: Record<string, unknown>) => void) => {
        if (key === null) return cb({ ...storageData });
        cb({ [key]: storageData[key] });
      }),
      set: vi.fn((data: Record<string, unknown>, cb?: () => void) => {
        Object.assign(storageData, data);
        cb?.();
      }),
      onChanged: { addListener: vi.fn() },
    },
  },
  runtime: {
    sendMessage: vi.fn(),
    onMessage: { addListener: vi.fn() },
    lastError: null,
  },
  tabs: {
    query: vi.fn(),
    sendMessage: vi.fn(),
  },
};
