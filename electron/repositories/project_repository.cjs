const BaseRepository = require('./base_repository.cjs');

class ProjectRepository extends BaseRepository {
  constructor() {
    super('projects');
  }

  getSearchColumns() {
    return ['name', 'description'];
  }
}

module.exports = ProjectRepository;
