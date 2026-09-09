import { BaseService } from './BaseService.js';
import { repositories } from '../database/repositories/index.js';
import crypto from 'crypto';

export class ApiKeyService extends BaseService {
  constructor() {
    super(repositories.apiKeys);
  }

  async findAll(filters = {}) {
    return this.repository.findAllWithRelations(filters);
  }

  async findById(id) {
    return this.repository.findByIdWithRelations(id);
  }

  async create(data) {
    const { key, ...keyData } = data;

    if (key) {
      const hash = this.hashKey(key);
      const prefix = key.substring(0, 8) + '...';
      return this.repository.create({ ...keyData, key_hash: hash, key_prefix: prefix });
    }

    return this.repository.create(keyData);
  }

  async update(id, data) {
    const { key, ...keyData } = data;

    if (key) {
      const hash = this.hashKey(key);
      const prefix = key.substring(0, 8) + '...';
      return this.repository.update(id, { ...keyData, key_hash: hash, key_prefix: prefix });
    }

    return this.repository.update(id, keyData);
  }

  async delete(id) {
    return this.repository.delete(id);
  }

  async verifyKey(id, providedKey) {
    const apiKey = await this.findById(id);
    if (!apiKey) return false;

    const hash = this.hashKey(providedKey);
    const isValid = hash === apiKey.key_hash;

    if (isValid) {
      this.repository.updateLastUsed(id);
    }

    return isValid;
  }

  async toggleActive(id) {
    const apiKey = await this.findById(id);
    if (!apiKey) return null;

    return this.update(id, { is_active: apiKey.is_active ? 0 : 1 });
  }

  hashKey(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
  }

  async findByProvider(providerId) {
    return this.repository.findAllWithRelations({ provider_id: providerId });
  }

  async findByAccount(accountId) {
    return this.repository.findAllWithRelations({ account_id: accountId });
  }
}
