-- Default providers
INSERT OR IGNORE INTO providers (name, description, base_url) VALUES
    ('OpenAI', 'OpenAI API', 'https://api.openai.com/v1'),
    ('Anthropic', 'Anthropic Claude API', 'https://api.anthropic.com/v1'),
    ('Google', 'Google Gemini API', 'https://generativelanguage.googleapis.com/v1'),
    ('Mistral', 'Mistral AI API', 'https://api.mistral.ai/v1'),
    ('Local', 'Local LLM (Ollama, LM Studio, etc.)', 'http://localhost:11434');

-- Default models
INSERT OR IGNORE INTO models (name, provider_id, description, max_tokens, cost_per_1k_input, cost_per_1k_output) VALUES
    ('gpt-4o', 1, 'GPT-4o - Most capable model', 128000, 0.005, 0.015),
    ('gpt-4o-mini', 1, 'GPT-4o Mini - Fast and affordable', 128000, 0.00015, 0.0006),
    ('gpt-4-turbo', 1, 'GPT-4 Turbo - Previous generation', 128000, 0.01, 0.03),
    ('claude-3-5-sonnet-20241022', 2, 'Claude 3.5 Sonnet - Best balance', 200000, 0.003, 0.015),
    ('claude-3-5-haiku-20241022', 2, 'Claude 3.5 Haiku - Fast and cheap', 200000, 0.001, 0.005),
    ('claude-3-opus-20240229', 2, 'Claude 3 Opus - Most capable', 200000, 0.015, 0.075),
    ('gemini-2.0-flash', 3, 'Gemini 2.0 Flash - Fast and versatile', 1000000, 0.0001, 0.0004),
    ('gemini-1.5-pro', 3, 'Gemini 1.5 Pro - Advanced reasoning', 2000000, 0.00125, 0.005),
    ('mistral-large-latest', 4, 'Mistral Large - Most capable', 128000, 0.003, 0.009),
    ('mistral-small-latest', 4, 'Mistral Small - Fast and affordable', 128000, 0.001, 0.003);

-- Default settings
INSERT OR IGNORE INTO settings (key, value, description) VALUES
    ('theme', 'system', 'Application theme (light/dark/system)'),
    ('default_provider', '1', 'Default provider ID'),
    ('default_model', '1', 'Default model ID'),
    ('auto_backup', 'true', 'Enable automatic database backups'),
    ('backup_interval', 'daily', 'Backup frequency (daily/weekly/monthly)'),
    ('max_tokens_default', '4096', 'Default max tokens for new agents'),
    ('temperature_default', '0.7', 'Default temperature for new agents'),
    ('api_key_encryption', 'true', 'Enable API key encryption'),
    ('export_format', 'json', 'Default export format (json/csv)'),
    ('notifications_enabled', 'true', 'Enable desktop notifications');
