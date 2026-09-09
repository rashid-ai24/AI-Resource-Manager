import { BaseService } from './BaseService.js';
import { repositories } from '../database/repositories/index.js';

export class ProviderService extends BaseService {
  constructor() {
    super(repositories.providers);
  }

  async findAll(filters = {}) {
    return this.repository.findAllWithStats(filters);
  }

  async findById(id) {
    return this.repository.findByIdWithStats(id);
  }

  async create(data) {
    return this.repository.create(data);
  }

  async update(id, data) {
    return this.repository.update(id, data);
  }

  async delete(id) {
    return this.repository.delete(id);
  }

  async toggleActive(id) {
    const provider = await this.findById(id);
    if (!provider) return null;

    return this.update(id, { is_active: provider.is_active ? 0 : 1 });
  }
}
