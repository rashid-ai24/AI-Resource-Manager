import { BaseRepository } from './BaseRepository.js';

export class ProjectRepository extends BaseRepository {
  constructor() {
    super('projects');
  }

  getSearchColumns() {
    return ['name', 'description', 'path'];
  }

  findAllWithRelations(filters = {}) {
    let sql = `
      SELECT p.*,
        GROUP_CONCAT(t.name) as tag_names
      FROM projects p
      LEFT JOIN project_tags pt ON p.id = pt.project_id
      LEFT JOIN tags t ON pt.tag_id = t.id
    `;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('(p.name LIKE ? OR p.description LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.tag_id) {
      conditions.push('pt.tag_id = ?');
      params.push(filters.tag_id);
    }

    if (filters.is_active !== undefined) {
      conditions.push('p.is_active = ?');
      params.push(filters.is_active);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' GROUP BY p.id ORDER BY p.created_at DESC';

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithRelations(id) {
    const project = this.db.prepare('SELECT * FROM projects WHERE id = ?').get(id);

    if (project) {
      project.tags = this.db.prepare(`
        SELECT t.* FROM tags t
        JOIN project_tags pt ON t.id = pt.tag_id
        WHERE pt.project_id = ?
      `).all(id);

      project.notes = this.db.prepare('SELECT * FROM notes WHERE project_id = ?').all(id);
    }

    return project;
  }

  createWithRelations(data) {
    const { tags, ...projectData } = data;

    return this.db.transaction(() => {
      const project = this.create(projectData);

      if (tags && tags.length > 0) {
        const insertTag = this.db.prepare('INSERT OR IGNORE INTO project_tags (project_id, tag_id) VALUES (?, ?)');
        for (const tagId of tags) {
          insertTag.run(project.id, tagId);
        }
      }

      return this.findByIdWithRelations(project.id);
    })();
  }

  updateWithRelations(id, data) {
    const { tags, ...projectData } = data;

    return this.db.transaction(() => {
      if (Object.keys(projectData).length > 0) {
        this.update(id, projectData);
      }

      if (tags !== undefined) {
        this.db.prepare('DELETE FROM project_tags WHERE project_id = ?').run(id);

        if (tags.length > 0) {
          const insertTag = this.db.prepare('INSERT OR IGNORE INTO project_tags (project_id, tag_id) VALUES (?, ?)');
          for (const tagId of tags) {
            insertTag.run(id, tagId);
          }
        }
      }

      return this.findByIdWithRelations(id);
    })();
  }
}
