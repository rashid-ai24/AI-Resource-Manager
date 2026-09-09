import { BaseService } from './BaseService.js';
import { repositories } from '../database/repositories/index.js';

export class ModelService extends BaseService {
  constructor() {
    super(repositories.models);
  }

  async findAll(filters = {}) {
    return this.repository.findAllWithProvider(filters);
  }

  async findById(id) {
    return this.repository.findByIdWithProvider(id);
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

  async findByProvider(providerId) {
    return this.repository.findAllWithProvider({ provider_id: providerId });
  }

  async toggleActive(id) {
    const model = await this.findById(id);
    if (!model) return null;

    return this.update(id, { is_active: model.is_active ? 0 : 1 });
  }
}
