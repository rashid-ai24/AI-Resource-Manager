import { BaseRepository } from './BaseRepository.js';

export class AgentRepository extends BaseRepository {
  constructor() {
    super('agents');
  }

  getSearchColumns() {
    return ['name', 'description', 'system_prompt'];
  }

  findAllWithRelations(filters = {}) {
    let sql = `
      SELECT a.*, 
        p.name as provider_name, 
        m.name as model_name,
        GROUP_CONCAT(t.name) as tag_names
      FROM agents a
      LEFT JOIN providers p ON a.provider_id = p.id
      LEFT JOIN models m ON a.model_id = m.id
      LEFT JOIN agent_tags at ON a.id = at.agent_id
      LEFT JOIN tags t ON at.tag_id = t.id
    `;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('(a.name LIKE ? OR a.description LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.provider_id) {
      conditions.push('a.provider_id = ?');
      params.push(filters.provider_id);
    }

    if (filters.model_id) {
      conditions.push('a.model_id = ?');
      params.push(filters.model_id);
    }

    if (filters.tag_id) {
      conditions.push('at.tag_id = ?');
      params.push(filters.tag_id);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' GROUP BY a.id ORDER BY a.created_at DESC';

    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithRelations(id) {
    const agent = this.db.prepare(`
      SELECT a.*, 
        p.name as provider_name, 
        m.name as model_name
      FROM agents a
      LEFT JOIN providers p ON a.provider_id = p.id
      LEFT JOIN models m ON a.model_id = m.id
      WHERE a.id = ?
    `).get(id);

    if (agent) {
      agent.tags = this.db.prepare(`
        SELECT t.* FROM tags t
        JOIN agent_tags at ON t.id = at.tag_id
        WHERE at.agent_id = ?
      `).all(id);
    }

    return agent;
  }

  createWithRelations(data) {
    const { tags, ...agentData } = data;

    return this.db.transaction(() => {
      const agent = this.create(agentData);

      if (tags && tags.length > 0) {
        const insertTag = this.db.prepare('INSERT OR IGNORE INTO agent_tags (agent_id, tag_id) VALUES (?, ?)');
        for (const tagId of tags) {
          insertTag.run(agent.id, tagId);
        }
      }

      return this.findByIdWithRelations(agent.id);
    })();
  }

  updateWithRelations(id, data) {
    const { tags, ...agentData } = data;

    return this.db.transaction(() => {
      if (Object.keys(agentData).length > 0) {
        this.update(id, agentData);
      }

      if (tags !== undefined) {
        this.db.prepare('DELETE FROM agent_tags WHERE agent_id = ?').run(id);

        if (tags.length > 0) {
          const insertTag = this.db.prepare('INSERT OR IGNORE INTO agent_tags (agent_id, tag_id) VALUES (?, ?)');
          for (const tagId of tags) {
            insertTag.run(id, tagId);
          }
        }
      }

      return this.findByIdWithRelations(id);
    })();
  }
}
