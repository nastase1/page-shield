import type { ModuleManifest, ModuleImpl, RegisteredModule } from '../types/module';

class ModuleManager {
  private modules = new Map<string, RegisteredModule>();

  register(manifest: ModuleManifest, impl: ModuleImpl): void {
    if (this.modules.has(manifest.id)) {
      console.warn(`[PageShield] Module "${manifest.id}" already registered.`);
      return;
    }
    this.modules.set(manifest.id, { manifest, impl, active: false });
  }

  activate(id: string, settings: Record<string, unknown>): void {
    const mod = this.getOrThrow(id);
    if (mod.active) mod.impl.deactivate();
    mod.impl.activate(settings);
    mod.active = true;
  }

  deactivate(id: string): void {
    const mod = this.getOrThrow(id);
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

  private getOrThrow(id: string): RegisteredModule {
    const mod = this.modules.get(id);
    if (!mod) throw new Error(`[PageShield] Module "${id}" not found.`);
    return mod;
  }
}

export const moduleManager = new ModuleManager();
