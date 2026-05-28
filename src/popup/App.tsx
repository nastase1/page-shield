import { useEffect, useState, useCallback, useMemo } from 'react';
import { settingsStore } from '../core/SettingsStore';
import { messageBus } from '../core/MessageBus';
import { moduleRegistry } from '../modules/registry';
import type { ModuleCategory, ModuleManifest } from '../types/module';
import ModuleCard from './components/ModuleCard';

type SettingsMap = Record<string, Record<string, unknown>>;

const MANIFESTS: ModuleManifest[] = moduleRegistry.map(r => r.manifest);

const CATEGORIES: { id: ModuleCategory; label: string }[] = [
  { id: 'vision',    label: '👁️ Vision & Colors' },
  { id: 'motion',    label: '⚡ Epilepsy & Motion' },
  { id: 'reading',   label: '📖 Dyslexia & Reading' },
  { id: 'focus',     label: '🎯 ADHD & Focus' },
  { id: 'motor',     label: '🖱️ Motor & Navigation' },
  { id: 'cognitive', label: '🧠 Audio & Cognitive' },
  { id: 'utility',   label: '⚙️ Utility' },
];

export default function App() {
  const [settingsMap, setSettingsMap] = useState<SettingsMap>({});
  const [loaded, setLoaded] = useState(false);
  const [openCats, setOpenCats] = useState<Set<ModuleCategory>>(
    () => new Set(CATEGORIES.map(c => c.id)),
  );

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

  const handleChange = useCallback(async (moduleId: string, next: Record<string, unknown>) => {
    setSettingsMap(prev => ({ ...prev, [moduleId]: next }));
    await settingsStore.set(moduleId, next);
    try {
      if (next.enabled) {
        await messageBus.send({ type: 'ACTIVATE_MODULE', moduleId, settings: next });
      } else {
        await messageBus.send({ type: 'DEACTIVATE_MODULE', moduleId });
      }
    } catch {
      // Content script unavailable on restricted pages.
    }
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<ModuleCategory, ModuleManifest[]>();
    CATEGORIES.forEach(c => map.set(c.id, []));
    MANIFESTS.forEach(m => map.get(m.category)?.push(m));
    return map;
  }, []);

  const toggleCat = (id: ModuleCategory) =>
    setOpenCats(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  if (!loaded) {
    return (
      <div className="w-72 flex items-center justify-center p-6">
        <span className="text-sm text-gray-400">Loading…</span>
      </div>
    );
  }

  return (
    <div className="w-72 bg-white flex flex-col">
      <header className="flex items-center gap-2 bg-blue-600 px-4 py-3 shrink-0">
        <span className="text-xl" role="img" aria-label="shield">🛡️</span>
        <h1 className="text-sm font-semibold text-white tracking-wide">PageShield</h1>
      </header>

      <main className="flex-1 overflow-y-auto max-h-[560px]">
        {CATEGORIES.map(cat => {
          const modules = grouped.get(cat.id) ?? [];
          if (!modules.length) return null;
          const open = openCats.has(cat.id);
          return (
            <div key={cat.id} className="border-b border-gray-100 last:border-0">
              <button
                className="flex w-full items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-50"
                onClick={() => toggleCat(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="text-gray-300">{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <div className="divide-y divide-gray-50">
                  {modules.map(manifest => (
                    <ModuleCard
                      key={manifest.id}
                      manifest={manifest}
                      settings={settingsMap[manifest.id] ?? {}}
                      onChange={next => handleChange(manifest.id, next)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </main>

      <footer className="shrink-0 px-4 py-2 text-center text-xs text-gray-400 border-t border-gray-100">
        PageShield — Accessibility Extension
      </footer>
    </div>
  );
}
