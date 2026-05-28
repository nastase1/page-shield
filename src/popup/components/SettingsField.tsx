import type { JSONSchemaProperty } from '../../types/module';

interface Props {
  fieldKey: string;
  schema: JSONSchemaProperty;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function SettingsField({ fieldKey, schema, value, onChange }: Props) {
  const id = `ps-${fieldKey}`;

  if (schema.type === 'boolean') {
    return (
      <label className="flex cursor-pointer items-center gap-2" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          className="h-3.5 w-3.5 rounded accent-blue-600"
          checked={!!value}
          onChange={e => onChange(e.target.checked)}
        />
        <span className="text-xs text-gray-700">{schema.title ?? fieldKey}</span>
      </label>
    );
  }

  if (schema.type === 'string' && schema.enum) {
    return (
      <div>
        <label className="mb-1 block text-xs text-gray-500" htmlFor={id}>
          {schema.title ?? fieldKey}
        </label>
        <select
          id={id}
          className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          value={value as string}
          onChange={e => onChange(e.target.value)}
        >
          {schema.enum.map((opt, i) => (
            <option key={opt} value={opt}>
              {schema.enumNames?.[i] ?? opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (schema.type === 'string' && !schema.enum) {
    return (
      <div>
        <label className="mb-1 block text-xs text-gray-500" htmlFor={id}>
          {schema.title ?? fieldKey}
        </label>
        <input
          id={id}
          type={schema.inputType === 'password' ? 'password' : 'text'}
          className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          value={(value as string) ?? ''}
          placeholder={schema.description}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (schema.type === 'number') {
    const num = value as number;
    return (
      <div>
        <label className="mb-1 flex items-center justify-between text-xs text-gray-500" htmlFor={id}>
          <span>{schema.title ?? fieldKey}</span>
          <span className="font-medium text-gray-700">{num}{schema.unit ?? ''}</span>
        </label>
        <input
          id={id}
          type="range"
          className="w-full accent-blue-600"
          min={schema.minimum ?? 0}
          max={schema.maximum ?? 100}
          step={schema.step ?? 1}
          value={num}
          onChange={e => onChange(Number(e.target.value))}
        />
      </div>
    );
  }

  return null;
}
