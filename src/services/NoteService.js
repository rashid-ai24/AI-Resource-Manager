import { BaseService } from './BaseService.js';
import { repositories } from '../database/repositories/index.js';

export class NoteService extends BaseService {
  constructor() {
    super(repositories.notes);
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

  async findByAgent(agentId) {
    return this.repository.findAllWithRelations({ agent_id: agentId });
  }

  async findByProject(projectId) {
    return this.repository.findAllWithRelations({ project_id: projectId });
  }

  async findByTag(tagId) {
    return this.repository.findAllWithRelations({ tag_id: tagId });
  }
}
