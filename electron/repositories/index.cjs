const AgentRepository = require('./agent_repository.cjs');
const ProviderRepository = require('./provider_repository.cjs');
const ModelRepository = require('./model_repository.cjs');
const AccountRepository = require('./account_repository.cjs');
const ApiKeyRepository = require('./api_key_repository.cjs');
const ProjectRepository = require('./project_repository.cjs');
const NoteRepository = require('./note_repository.cjs');
const TagRepository = require('./tag_repository.cjs');
const SettingsRepository = require('./settings_repository.cjs');
const ActivityRepository = require('./activity_repository.cjs');
const UsageRepository = require('./usage_repository.cjs');
const QuotaRepository = require('./quota_repository.cjs');
const FavoriteRepository = require('./favorite_repository.cjs');
const TemplateRepository = require('./template_repository.cjs');
const NotificationRepository = require('./notification_repository.cjs');

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
  activity: new ActivityRepository(),
  usage: new UsageRepository(),
  quotas: new QuotaRepository(),
  favorites: new FavoriteRepository(),
  templates: new TemplateRepository(),
  notifications: new NotificationRepository(),
};

module.exports = repositories;
