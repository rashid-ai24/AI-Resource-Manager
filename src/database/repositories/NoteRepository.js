import { BaseRepository } from './BaseRepository.js';

export class NoteRepository extends BaseRepository {
  constructor() {
    super('notes');
  }

  getSearchColumns() {
    return ['title', 'content'];
  }

  findAllWithRelations(filters = {}) {
    let sql = `
      SELECT n.*,
        a.name as agent_name,
        p.name as project_name,
        GROUP_CONCAT(t.name) as tag_names
      FROM notes n
      LEFT JOIN agents a ON n.agent_id = a.id
      LEFT JOIN projects p ON n.project_id = p.id
      LEFT JOIN note_tags nt ON n.id = nt.note_id
      LEFT JOIN tags t ON nt.tag_id = t.id
    `;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('(n.title LIKE ? OR n.content LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.agent_id) {
      conditions.push('n.agent_id = ?');
      params.push(filters.agent_id);
    }

    if (filters.project_id) {
      conditions.push('n.project_id = ?');
      params.push(filters.project_id);
    }

    if (filters.tag_id) {
      conditions.push('nt.tag_id = ?');
      params.push(filters.tag_id);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' GROUP BY n.id ORDER BY n.created_at DESC';

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithRelations(id) {
    const note = this.db.prepare(`
      SELECT n.*,
        a.name as agent_name,
        p.name as project_name
      FROM notes n
      LEFT JOIN agents a ON n.agent_id = a.id
      LEFT JOIN projects p ON n.project_id = p.id
      WHERE n.id = ?
    `).get(id);

    if (note) {
      note.tags = this.db.prepare(`
        SELECT t.* FROM tags t
        JOIN note_tags nt ON t.id = nt.tag_id
        WHERE nt.note_id = ?
      `).all(id);
    }

    return note;
  }

  createWithRelations(data) {
    const { tags, ...noteData } = data;

    return this.db.transaction(() => {
      const note = this.create(noteData);

      if (tags && tags.length > 0) {
        const insertTag = this.db.prepare('INSERT OR IGNORE INTO note_tags (note_id, tag_id) VALUES (?, ?)');
        for (const tagId of tags) {
          insertTag.run(note.id, tagId);
        }
      }

      return this.findByIdWithRelations(note.id);
    })();
  }

  updateWithRelations(id, data) {
    const { tags, ...noteData } = data;

    return this.db.transaction(() => {
      if (Object.keys(noteData).length > 0) {
        this.update(id, noteData);
      }

      if (tags !== undefined) {
        this.db.prepare('DELETE FROM note_tags WHERE note_id = ?').run(id);

        if (tags.length > 0) {
          const insertTag = this.db.prepare('INSERT OR IGNORE INTO note_tags (note_id, tag_id) VALUES (?, ?)');
          for (const tagId of tags) {
            insertTag.run(id, tagId);
          }
        }
      }

      return this.findByIdWithRelations(id);
    })();
  }
}
