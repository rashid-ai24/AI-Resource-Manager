import { BaseService } from './BaseService.js';
import { repositories } from '../database/repositories/index.js';

export class AgentService extends BaseService {
  constructor() {
    super(repositories.agents);
  }

  async findAll(filters = {}) {
    return this.repository.findAllWithRelations(filters);
  }

  async findById(id) {
    return this.repository.findByIdWithRelations(id);
  }

  async create(data) {
    return this.repository.createWithRelations(data);
  }

  async update(id, data) {
    return this.repository.updateWithRelations(id, data);
  }

  async delete(id) {
    return this.repository.delete(id);
  }

  async findByProvider(providerId) {
    return this.repository.findAllWithRelations({ provider_id: providerId });
  }

  async findByModel(modelId) {
    return this.repository.findAllWithRelations({ model_id: modelId });
  }

  async findByTag(tagId) {
    return this.repository.findAllWithRelations({ tag_id: tagId });
  }
}
