export type ModuleCategory =
  | 'vision'
  | 'motion'
  | 'reading'
  | 'focus'
  | 'motor'
  | 'cognitive'
  | 'utility';

export type JSONSchemaProperty =
  | {
      type: 'boolean';
      title?: string;
      description?: string;
      default?: boolean;
    }
  | {
      type: 'string';
      title?: string;
      description?: string;
      default?: string;
      inputType?: 'text' | 'password';
      enum?: string[];
      enumNames?: string[];
    }
  | {
      type: 'number';
      title?: string;
      description?: string;
      default?: number;
      minimum?: number;
      maximum?: number;
      step?: number;
      unit?: string;
    };

export type JSONSchema = {
  type: 'object';
  properties: Record<string, JSONSchemaProperty>;
  required?: string[];
};

export interface ModuleManifest {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ModuleCategory;
  settingsSchema: JSONSchema;
}

export interface ModuleImpl {
  activate(settings: Record<string, unknown>): void;
  deactivate(): void;
}

export interface RegisteredModule {
  manifest: ModuleManifest;
  impl: ModuleImpl;
  active: boolean;
}
