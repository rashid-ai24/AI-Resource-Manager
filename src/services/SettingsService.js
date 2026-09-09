import { BaseService } from './BaseService.js';
import { repositories } from '../database/repositories/index.js';

export class SettingsService extends BaseService {
  constructor() {
    super(repositories.settings);
  }

  async get(key) {
    return this.repository.get(key);
  }

  async set(key, value, description = '') {
    return this.repository.set(key, value, description);
  }

  async getAll() {
    return this.repository.getAll();
  }

  async delete(key) {
    return this.repository.delete(key);
  }
}
