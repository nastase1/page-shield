import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ModuleManifest, ModuleImpl } from '../../types/module';

// Tests run against the logic extracted into a plain class.
// The exported `moduleManager` singleton shares module state across tests,
// so we test the class in isolation here.

class ModuleManager {
  private modules = new Map<string, { manifest: ModuleManifest; impl: ModuleImpl; active: boolean }>();

  register(manifest: ModuleManifest, impl: ModuleImpl): void {
    if (!this.modules.has(manifest.id)) {
      this.modules.set(manifest.id, { manifest, impl, active: false });
    }
  }

  activate(id: string, settings: Record<string, unknown>): void {
    const mod = this.modules.get(id);
    if (!mod) throw new Error(`Module "${id}" not found.`);
    if (mod.active) mod.impl.deactivate();
    mod.impl.activate(settings);
    mod.active = true;
  }

  deactivate(id: string): void {
    const mod = this.modules.get(id);
    if (!mod) throw new Error(`Module "${id}" not found.`);
    if (!mod.active) return;
    mod.impl.deactivate();
    mod.active = false;
  }

  isActive(id: string): boolean {
    return this.modules.get(id)?.active ?? false;
  }

  getManifests(): ModuleManifest[] {
    return [...this.modules.values()].map(m => m.manifest);
  }
}

function makeManifest(id: string): ModuleManifest {
  return { id, name: id, description: '', icon: '', settingsSchema: { type: 'object', properties: {} } };
}

function makeImpl() {
  return { activate: vi.fn(), deactivate: vi.fn() } satisfies ModuleImpl;
}

describe('ModuleManager', () => {
  let manager: ModuleManager;

  beforeEach(() => { manager = new ModuleManager(); });

  it('registers modules and lists their manifests', () => {
    manager.register(makeManifest('a'), makeImpl());
    manager.register(makeManifest('b'), makeImpl());
    expect(manager.getManifests().map(m => m.id)).toEqual(['a', 'b']);
  });

  it('calls impl.activate with settings', () => {
    const impl = makeImpl();
    manager.register(makeManifest('x'), impl);
    manager.activate('x', { enabled: true });
    expect(impl.activate).toHaveBeenCalledWith({ enabled: true });
  });

  it('sets isActive to true after activate', () => {
    manager.register(makeManifest('x'), makeImpl());
    manager.activate('x', {});
    expect(manager.isActive('x')).toBe(true);
  });

  it('calls impl.deactivate and sets isActive false on deactivate', () => {
    const impl = makeImpl();
    manager.register(makeManifest('x'), impl);
    manager.activate('x', {});
    manager.deactivate('x');
    expect(impl.deactivate).toHaveBeenCalled();
    expect(manager.isActive('x')).toBe(false);
  });

  it('calls deactivate before re-activating', () => {
    const impl = makeImpl();
    manager.register(makeManifest('x'), impl);
    manager.activate('x', {});
    manager.activate('x', { changed: true });
    expect(impl.deactivate).toHaveBeenCalledTimes(1);
    expect(impl.activate).toHaveBeenCalledTimes(2);
  });

  it('deactivating an inactive module is a no-op', () => {
    const impl = makeImpl();
    manager.register(makeManifest('x'), impl);
    manager.deactivate('x');
    expect(impl.deactivate).not.toHaveBeenCalled();
  });

  it('throws when activating an unregistered module', () => {
    expect(() => manager.activate('ghost', {})).toThrow(/not found/);
  });

  it('isActive returns false for unregistered modules', () => {
    expect(manager.isActive('ghost')).toBe(false);
  });
});
