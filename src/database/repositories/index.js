import { AgentRepository } from './AgentRepository.js';
import { ProviderRepository } from './ProviderRepository.js';
import { ModelRepository } from './ModelRepository.js';
import { AccountRepository } from './AccountRepository.js';
import { ApiKeyRepository } from './ApiKeyRepository.js';
import { ProjectRepository } from './ProjectRepository.js';
import { NoteRepository } from './NoteRepository.js';
import { TagRepository } from './TagRepository.js';
import { SettingsRepository } from './SettingsRepository.js';

export const repositories = {
  agents: new AgentRepository(),
  providers: new ProviderRepository(),
  models: new ModelRepository(),
  accounts: new AccountRepository(),
  apiKeys: new ApiKeyRepository(),
  projects: new ProjectRepository(),
  notes: new NoteRepository(),
  tags: new TagRepository(),
  settings: new SettingsRepository(),
};

export {
  AgentRepository,
  ProviderRepository,
  ModelRepository,
  AccountRepository,
  ApiKeyRepository,
  ProjectRepository,
  NoteRepository,
  TagRepository,
  SettingsRepository,
};
