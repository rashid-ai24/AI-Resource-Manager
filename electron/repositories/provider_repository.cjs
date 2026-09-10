const BaseRepository = require('./base_repository.cjs');

class ProviderRepository extends BaseRepository {
  constructor() {
    super('providers');
  }

  getSearchColumns() {
    return ['name', 'description'];
  }

  findActive() {
    return this.findAll({ is_active: 1 });
  }
}

module.exports = ProviderRepository;
