import { useEffect, useState, useCallback } from 'react';
import { settingsStore } from '../core/SettingsStore';
import { messageBus } from '../core/MessageBus';
import { moduleRegistry } from '../modules/registry';
import type { ModuleManifest } from '../types/module';
import ModuleCard from './components/ModuleCard';

type SettingsMap = Record<string, Record<string, unknown>>;

const MANIFESTS: ModuleManifest[] = moduleRegistry.map(r => r.manifest);

export default function App() {
  const [settingsMap, setSettingsMap] = useState<SettingsMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const map: SettingsMap = {};
      for (const manifest of MANIFESTS) {
        const saved = await settingsStore.get(manifest.id);
        map[manifest.id] = { ...settingsStore.getDefaults(manifest), ...saved };
      }
      setSettingsMap(map);
      setLoaded(true);
    })();
  }, []);

  const handleChange = useCallback(
    async (moduleId: string, next: Record<string, unknown>) => {
      setSettingsMap(prev => ({ ...prev, [moduleId]: next }));
      await settingsStore.set(moduleId, next);

      try {
        if (next.enabled) {
          await messageBus.send({ type: 'ACTIVATE_MODULE', moduleId, settings: next });
        } else {
          await messageBus.send({ type: 'DEACTIVATE_MODULE', moduleId });
        }
      } catch {
        // Content script unavailable on restricted pages (chrome://, about:, etc.)
      }
    },
    [],
  );

  if (!loaded) {
    return (
      <div className="w-72 flex items-center justify-center p-6">
        <span className="text-sm text-gray-400">Loading…</span>
      </div>
    );
  }

  return (
    <div className="w-72 bg-white flex flex-col">
      <header className="flex items-center gap-2 bg-blue-600 px-4 py-3">
        <span className="text-xl" role="img" aria-label="shield">🛡️</span>
        <h1 className="text-sm font-semibold text-white tracking-wide">PageShield</h1>
      </header>

      <main className="flex-1 divide-y divide-gray-100 overflow-y-auto max-h-[520px]">
        {MANIFESTS.map(manifest => (
          <ModuleCard
            key={manifest.id}
            manifest={manifest}
            settings={settingsMap[manifest.id] ?? {}}
            onChange={next => handleChange(manifest.id, next)}
          />
        ))}
      </main>

      <footer className="px-4 py-2 text-center text-xs text-gray-400 border-t border-gray-100">
        Accessibility Extension
      </footer>
    </div>
  );
}
