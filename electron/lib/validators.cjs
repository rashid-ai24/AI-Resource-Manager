const { z } = require('zod');

// Agent schemas
const AgentCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().default(''),
  provider_id: z.number().int().nullable().optional(),
  model_id: z.number().int().nullable().optional(),
  system_prompt: z.string().optional().default(''),
  temperature: z.number().min(0).max(2).optional().default(0.7),
  max_tokens: z.number().int().positive().optional().default(4096),
});

const AgentUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  provider_id: z.number().int().nullable().optional(),
  model_id: z.number().int().nullable().optional(),
  system_prompt: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().int().positive().optional(),
});

// Provider schemas
const ProviderCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().default(''),
  base_url: z.string().optional().default(''),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

const ProviderUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  base_url: z.string().optional(),
  is_active: z.number().int().min(0).max(1).optional(),
});

// Model schemas
const ModelCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  provider_id: z.number().int().nullable().optional(),
  description: z.string().optional().default(''),
  max_tokens: z.number().int().positive().optional().default(4096),
  cost_per_1k_input: z.number().min(0).optional().default(0),
  cost_per_1k_output: z.number().min(0).optional().default(0),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

const ModelUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  provider_id: z.number().int().nullable().optional(),
  description: z.string().optional(),
  max_tokens: z.number().int().positive().optional(),
  cost_per_1k_input: z.number().min(0).optional(),
  cost_per_1k_output: z.number().min(0).optional(),
  is_active: z.number().int().min(0).max(1).optional(),
});

// Account schemas
const AccountCreateSchema = z.object({
  provider_id: z.number().int().positive('Provider ID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().optional().default(''),
  description: z.string().optional().default(''),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

const AccountUpdateSchema = z.object({
  provider_id: z.number().int().positive().optional(),
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().optional(),
  description: z.string().optional(),
  is_active: z.number().int().min(0).max(1).optional(),
});

// API Key schemas
const ApiKeyCreateSchema = z.object({
  provider_id: z.number().int().positive('Provider ID is required'),
  account_id: z.number().int().nullable().optional(),
  name: z.string().min(1, 'Name is required'),
  key_hash: z.string().min(1, 'Key hash is required'),
  key_prefix: z.string().min(1, 'Key prefix is required'),
  description: z.string().optional().default(''),
  expires_at: z.string().nullable().optional(),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

const ApiKeyUpdateSchema = z.object({
  provider_id: z.number().int().positive().optional(),
  account_id: z.number().int().nullable().optional(),
  name: z.string().min(1, 'Name is required').optional(),
  key_hash: z.string().min(1).optional(),
  key_prefix: z.string().min(1).optional(),
  description: z.string().optional(),
  expires_at: z.string().nullable().optional(),
  is_active: z.number().int().min(0).max(1).optional(),
});

// Project schemas
const ProjectCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().default(''),
  path: z.string().optional().default(''),
  is_active: z.number().int().min(0).max(1).optional().default(1),
});

const ProjectUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  path: z.string().optional(),
  is_active: z.number().int().min(0).max(1).optional(),
});

// Note schemas
const NoteCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional().default(''),
  agent_id: z.number().int().nullable().optional(),
  project_id: z.number().int().nullable().optional(),
});

const NoteUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().optional(),
  agent_id: z.number().int().nullable().optional(),
  project_id: z.number().int().nullable().optional(),
});

// Tag schemas
const TagCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().optional().default('#6B7280'),
});

const TagUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  color: z.string().optional(),
});

// Settings schemas
const SettingSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string(),
  description: z.string().optional().default(''),
});

// Filter schemas
const ListFilterSchema = z.object({
  search: z.string().optional(),
  is_active: z.number().int().min(0).max(1).optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().min(0).optional(),
}).passthrough();

module.exports = {
  AgentCreateSchema,
  AgentUpdateSchema,
  ProviderCreateSchema,
  ProviderUpdateSchema,
  ModelCreateSchema,
  ModelUpdateSchema,
  AccountCreateSchema,
  AccountUpdateSchema,
  ApiKeyCreateSchema,
  ApiKeyUpdateSchema,
  ProjectCreateSchema,
  ProjectUpdateSchema,
  NoteCreateSchema,
  NoteUpdateSchema,
  TagCreateSchema,
  TagUpdateSchema,
  SettingSchema,
  ListFilterSchema,
};
