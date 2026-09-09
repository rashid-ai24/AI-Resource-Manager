import { BaseService } from './BaseService.js';
import { repositories } from '../database/repositories/index.js';

export class TagService extends BaseService {
  constructor() {
    super(repositories.tags);
  }

  async findAll(filters = {}) {
    return this.repository.findAllWithUsage(filters);
  }

  async findById(id) {
    return this.repository.findByIdWithUsage(id);
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

  async findByName(name) {
    return this.repository.db.prepare('SELECT * FROM tags WHERE name = ?').get(name);
  }
}
