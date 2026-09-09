import { AgentService } from './AgentService.js';
import { ProviderService } from './ProviderService.js';
import { ModelService } from './ModelService.js';
import { AccountService } from './AccountService.js';
import { ApiKeyService } from './ApiKeyService.js';
import { ProjectService } from './ProjectService.js';
import { NoteService } from './NoteService.js';
import { TagService } from './TagService.js';
import { SettingsService } from './SettingsService.js';

export const services = {
  agents: new AgentService(),
  providers: new ProviderService(),
  models: new ModelService(),
  accounts: new AccountService(),
  apiKeys: new ApiKeyService(),
  projects: new ProjectService(),
  notes: new NoteService(),
  tags: new TagService(),
  settings: new SettingsService(),
};

export {
  AgentService,
  ProviderService,
  ModelService,
  AccountService,
  ApiKeyService,
  ProjectService,
  NoteService,
  TagService,
  SettingsService,
};
