import { BaseRepository } from './BaseRepository.js';

export class TagRepository extends BaseRepository {
  constructor() {
    super('tags');
  }

  getSearchColumns() {
    return ['name'];
  }

  findAllWithUsage(filters = {}) {
    let sql = `
      SELECT t.*,
        (SELECT COUNT(*) FROM agent_tags WHERE tag_id = t.id) as agent_count,
        (SELECT COUNT(*) FROM project_tags WHERE tag_id = t.id) as project_count,
        (SELECT COUNT(*) FROM note_tags WHERE tag_id = t.id) as note_count
      FROM tags t
    `;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('t.name LIKE ?');
      params.push(`%${filters.search}%`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY t.name ASC';

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithUsage(id) {
    const tag = this.db.prepare('SELECT * FROM tags WHERE id = ?').get(id);

    if (tag) {
      tag.agents = this.db.prepare(`
        SELECT a.* FROM agents a
        JOIN agent_tags at ON a.id = at.agent_id
        WHERE at.tag_id = ?
      `).all(id);

      tag.projects = this.db.prepare(`
        SELECT p.* FROM projects p
        JOIN project_tags pt ON p.id = pt.project_id
        WHERE pt.tag_id = ?
      `).all(id);

      tag.notes = this.db.prepare(`
        SELECT n.* FROM notes n
        JOIN note_tags nt ON n.id = nt.note_id
        WHERE nt.tag_id = ?
      `).all(id);
    }

    return tag;
  }
}
