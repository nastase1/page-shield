import type { ModuleManifest } from '../../types/module';
import SettingsField from './SettingsField';

interface Props {
  manifest: ModuleManifest;
  settings: Record<string, unknown>;
  onChange: (settings: Record<string, unknown>) => void;
}

export default function ModuleCard({ manifest, settings, onChange }: Props) {
  const enabled = !!settings.enabled;

  const set = (key: string, value: unknown) => onChange({ ...settings, [key]: value });

  const extraFields = Object.entries(manifest.settingsSchema.properties).filter(
    ([key]) => key !== 'enabled',
  );

  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl shrink-0" role="img" aria-label={manifest.name}>
            {manifest.icon}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{manifest.name}</p>
            <p className="text-xs text-gray-500 leading-snug mt-0.5">{manifest.description}</p>
          </div>
        </div>

        {/* Toggle switch */}
        <label className="relative inline-flex shrink-0 cursor-pointer items-center mt-0.5">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={e => set('enabled', e.target.checked)}
            aria-label={`Toggle ${manifest.name}`}
          />
          <div className="h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-4 peer-focus:ring-2 peer-focus:ring-blue-400 peer-focus:outline-none" />
        </label>
      </div>

      {enabled && extraFields.length > 0 && (
        <div className="mt-3 space-y-3 pl-9">
          {extraFields.map(([key, schema]) => (
            <SettingsField
              key={key}
              fieldKey={key}
              schema={schema}
              value={settings[key]}
              onChange={v => set(key, v)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
