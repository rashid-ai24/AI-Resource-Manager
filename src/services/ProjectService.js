import { BaseService } from './BaseService.js';
import { repositories } from '../database/repositories/index.js';

export class ProjectService extends BaseService {
  constructor() {
    super(repositories.projects);
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

  async findByTag(tagId) {
    return this.repository.findAllWithRelations({ tag_id: tagId });
  }

  async toggleActive(id) {
    const project = await this.findById(id);
    if (!project) return null;

    return this.update(id, { is_active: project.is_active ? 0 : 1 });
  }
}
