import { moduleManager } from '../core/ModuleManager';
import { settingsStore } from '../core/SettingsStore';
import { messageBus } from '../core/MessageBus';
import { moduleRegistry } from '../modules/registry';

for (const { manifest, impl } of moduleRegistry) {
  moduleManager.register(manifest, impl);
}

async function applyStoredSettings(): Promise<void> {
  for (const manifest of moduleManager.getManifests()) {
    const saved = await settingsStore.get(manifest.id);
    const settings = { ...settingsStore.getDefaults(manifest), ...saved };
    if (settings.enabled) moduleManager.activate(manifest.id, settings);
  }
}

applyStoredSettings();

messageBus.onMessage((message, _sender, sendResponse) => {
  switch (message.type) {
    case 'ACTIVATE_MODULE':
      moduleManager.activate(message.moduleId, message.settings);
      return false;

    case 'DEACTIVATE_MODULE':
      moduleManager.deactivate(message.moduleId);
      return false;

    case 'UPDATE_SETTINGS':
      if (moduleManager.isActive(message.moduleId)) {
        moduleManager.activate(message.moduleId, message.settings);
      }
      return false;

    case 'GET_STATE': {
      const activeModules = moduleManager
        .getManifests()
        .filter(m => moduleManager.isActive(m.id))
        .map(m => m.id);
      sendResponse({ type: 'STATE_RESPONSE', activeModules, settings: {} });
      return true;
    }

    default:
      return false;
  }
});
