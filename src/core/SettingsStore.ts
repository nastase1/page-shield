import type { ModuleManifest } from '../types/module';

export type AllModuleSettings = Record<string, Record<string, unknown>>;

type ChangeListener = (moduleId: string, settings: Record<string, unknown>) => void;

class SettingsStore {
  private listeners: ChangeListener[] = [];

  async get(moduleId: string): Promise<Record<string, unknown>> {
    return new Promise(resolve => {
      chrome.storage.sync.get(moduleId, result => {
        resolve((result[moduleId] as Record<string, unknown>) ?? {});
      });
    });
  }

  async getAll(): Promise<AllModuleSettings> {
    return new Promise(resolve => {
      chrome.storage.sync.get(null, result => {
        resolve(result as AllModuleSettings);
      });
    });
  }

  async set(moduleId: string, settings: Record<string, unknown>): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [moduleId]: settings }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        this.listeners.forEach(l => l(moduleId, settings));
        resolve();
      });
    });
  }

  getDefaults(manifest: ModuleManifest): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(manifest.settingsSchema.properties)
        .filter(([, prop]) => prop.default !== undefined)
        .map(([key, prop]) => [key, prop.default]),
    );
  }

  onChange(listener: ChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  watchStorage(
    callback: (change: chrome.storage.StorageChange, moduleId: string) => void,
  ): void {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'sync') return;
      Object.entries(changes).forEach(([key, change]) => callback(change, key));
    });
  }
}

export const settingsStore = new SettingsStore();
