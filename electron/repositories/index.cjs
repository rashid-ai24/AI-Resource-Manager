const AgentRepository = require('./agent_repository.cjs');
const ProviderRepository = require('./provider_repository.cjs');
const ModelRepository = require('./model_repository.cjs');
const AccountRepository = require('./account_repository.cjs');
const ApiKeyRepository = require('./api_key_repository.cjs');
const ProjectRepository = require('./project_repository.cjs');
const NoteRepository = require('./note_repository.cjs');
const TagRepository = require('./tag_repository.cjs');
const SettingsRepository = require('./settings_repository.cjs');

const repositories = {
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

module.exports = repositories;
