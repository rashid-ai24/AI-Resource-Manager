const BaseRepository = require('./base_repository.cjs');

class TemplateRepository extends BaseRepository {
  constructor() {
    super('templates');
  }

  getSearchColumns() {
    return ['name', 'description'];
  }

  findByType(templateType) {
    return this.db.prepare(
      `SELECT * FROM templates WHERE template_type = ? AND deleted_at IS NULL ORDER BY created_at DESC`
    ).all(templateType);
  }

  findActive() {
    return this.db.prepare(
      `SELECT * FROM templates WHERE is_active = 1 AND deleted_at IS NULL ORDER BY created_at DESC`
    ).all();
  }

  getConfig(id) {
    const template = this.findById(id);
    if (!template) return null;
    try {
      return { ...template, config: JSON.parse(template.config_json || '{}') };
    } catch {
      return { ...template, config: {} };
    }
  }

  createWithConfig(data) {
    const configJson = data.config ? JSON.stringify(data.config) : '{}';
    const result = this.db.prepare(
      `INSERT INTO templates (name, description, template_type, config_json, is_active) VALUES (?, ?, ?, ?, ?)`
    ).run(data.name, data.description || '', data.template_type || 'agent', configJson, data.is_active !== undefined ? data.is_active : 1);
    return this.getConfig(result.lastInsertRowid);
  }

  updateWithConfig(id, data) {
    const updates = [];
    const params = [];

    if (data.name !== undefined) { updates.push('name = ?'); params.push(data.name); }
    if (data.description !== undefined) { updates.push('description = ?'); params.push(data.description); }
    if (data.template_type !== undefined) { updates.push('template_type = ?'); params.push(data.template_type); }
    if (data.config !== undefined) { updates.push('config_json = ?'); params.push(JSON.stringify(data.config)); }
    if (data.is_active !== undefined) { updates.push('is_active = ?'); params.push(data.is_active); }

    if (updates.length === 0) return this.getConfig(id);

    updates.push(`updated_at = datetime('now')`);
    params.push(id);

    this.db.prepare(
      `UPDATE templates SET ${updates.join(', ')} WHERE id = ? AND deleted_at IS NULL`
    ).run(...params);

    return this.getConfig(id);
  }

  duplicate(id) {
    const original = this.getConfig(id);
    if (!original) return null;

    return this.createWithConfig({
      name: `${original.name} (Copy)`,
      description: original.description,
      template_type: original.template_type,
      config: original.config,
    });
  }
}

module.exports = TemplateRepository;
