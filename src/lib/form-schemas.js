import { z } from 'zod';

// Agent form schema and fields
export const AgentFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional().default(''),
  provider_id: z.number().int().nullable().optional(),
  model_id: z.number().int().nullable().optional(),
  system_prompt: z.string().max(10000).optional().default(''),
  temperature: z.number().min(0).max(2).optional().default(0.7),
  max_tokens: z.number().int().min(1).max(100000).optional().default(4096),
});

export const agentFormFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter agent name',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter agent description',
  },
  {
    name: 'provider_id',
    label: 'Provider',
    type: 'autocomplete',
    entity: 'providers',
    placeholder: 'Search providers...',
  },
  {
    name: 'model_id',
    label: 'Model',
    type: 'autocomplete',
    entity: 'models',
    placeholder: 'Search models...',
  },
  {
    name: 'system_prompt',
    label: 'System Prompt',
    type: 'textarea',
    rows: 6,
    placeholder: 'Enter system prompt',
  },
  {
    name: 'temperature',
    label: 'Temperature',
    type: 'slider',
    min: 0,
    max: 2,
    step: 0.1,
  },
  {
    name: 'max_tokens',
    label: 'Max Tokens',
    type: 'number',
    min: 1,
    max: 100000,
  },
];

// Provider form schema and fields
export const ProviderFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional().default(''),
  base_url: z.string().url('Must be a valid URL').optional().default(''),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

export const providerFormFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter provider name',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter provider description',
  },
  {
    name: 'base_url',
    label: 'Base URL',
    type: 'text',
    placeholder: 'https://api.example.com',
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'switch',
  },
];

// Model form schema and fields
export const ModelFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  provider_id: z.number().int().nullable().optional(),
  description: z.string().max(500).optional().default(''),
  max_tokens: z.number().int().min(1).max(100000).optional().default(4096),
  cost_per_1k_input: z.number().min(0).optional().default(0),
  cost_per_1k_output: z.number().min(0).optional().default(0),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

export const modelFormFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter model name',
  },
  {
    name: 'provider_id',
    label: 'Provider',
    type: 'autocomplete',
    entity: 'providers',
    placeholder: 'Search providers...',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter model description',
  },
  {
    name: 'max_tokens',
    label: 'Max Tokens',
    type: 'number',
    min: 1,
    max: 100000,
  },
  {
    name: 'cost_per_1k_input',
    label: 'Cost per 1K Input Tokens',
    type: 'number',
    min: 0,
    step: 0.001,
  },
  {
    name: 'cost_per_1k_output',
    label: 'Cost per 1K Output Tokens',
    type: 'number',
    min: 0,
    step: 0.001,
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'switch',
  },
];

// Account form schema and fields
export const AccountFormSchema = z.object({
  provider_id: z.number().int().positive('Provider is required'),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Must be a valid email').optional().default(''),
  description: z.string().max(500).optional().default(''),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

export const accountFormFields = [
  {
    name: 'provider_id',
    label: 'Provider',
    type: 'autocomplete',
    entity: 'providers',
    placeholder: 'Search providers...',
    required: true,
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter account name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'account@example.com',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter account description',
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'switch',
  },
];

// API Key form schema and fields
export const ApiKeyFormSchema = z.object({
  provider_id: z.number().int().positive('Provider is required'),
  account_id: z.number().int().nullable().optional(),
  name: z.string().min(1, 'Name is required').max(100),
  key_hash: z.string().min(1, 'Key is required'),
  key_prefix: z.string().min(1, 'Key prefix is required'),
  description: z.string().max(500).optional().default(''),
  expires_at: z.string().nullable().optional(),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

export const apiKeyFormFields = [
  {
    name: 'provider_id',
    label: 'Provider',
    type: 'autocomplete',
    entity: 'providers',
    placeholder: 'Search providers...',
    required: true,
  },
  {
    name: 'account_id',
    label: 'Account',
    type: 'autocomplete',
    entity: 'accounts',
    placeholder: 'Search accounts...',
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter API key name',
  },
  {
    name: 'key_hash',
    label: 'API Key',
    type: 'text',
    required: true,
    placeholder: 'Enter API key',
  },
  {
    name: 'key_prefix',
    label: 'Key Prefix',
    type: 'text',
    required: true,
    placeholder: 'sk-...',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter API key description',
  },
  {
    name: 'expires_at',
    label: 'Expires At',
    type: 'date',
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'switch',
  },
];

// Project form schema and fields
export const ProjectFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional().default(''),
  path: z.string().optional().default(''),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

export const projectFormFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter project name',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter project description',
  },
  {
    name: 'path',
    label: 'Path',
    type: 'text',
    placeholder: '/path/to/project',
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'switch',
  },
];

// Note form schema and fields
export const NoteFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().optional().default(''),
  agent_id: z.number().int().nullable().optional(),
  project_id: z.number().int().nullable().optional(),
});

export const noteFormFields = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
    placeholder: 'Enter note title',
  },
  {
    name: 'content',
    label: 'Content',
    type: 'textarea',
    rows: 8,
    placeholder: 'Enter note content',
  },
  {
    name: 'agent_id',
    label: 'Agent',
    type: 'autocomplete',
    entity: 'agents',
    placeholder: 'Search agents...',
  },
  {
    name: 'project_id',
    label: 'Project',
    type: 'autocomplete',
    entity: 'projects',
    placeholder: 'Search projects...',
  },
];

// Tag form schema and fields
export const TagFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color').optional().default('#6B7280'),
});

export const tagFormFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter tag name',
  },
  {
    name: 'color',
    label: 'Color',
    type: 'text',
    placeholder: '#6B7280',
  },
];
