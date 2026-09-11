const BaseRepository = require('./base_repository.cjs');

class UsageRepository extends BaseRepository {
  constructor() {
    super('usage_logs');
  }

  getSearchColumns() {
    return [];
  }

  logUsage({ agentId, providerId, modelId, projectId, inputTokens, outputTokens, cost }) {
    try {
      const sql = `INSERT INTO usage_logs (agent_id, provider_id, model_id, project_id, input_tokens, output_tokens, cost) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      this.db.prepare(sql).run(agentId || null, providerId || null, modelId || null, projectId || null, inputTokens || 0, outputTokens || 0, cost || 0);
    } catch (error) {
      console.error('Usage logging failed:', error);
    }
  }

  getUsageOverTime(timeRange, filters = {}) {
    const daysAgo = this._getDaysAgo(timeRange);
    let sql = `
      SELECT 
        date(timestamp) as date,
        SUM(input_tokens) as inputTokens,
        SUM(output_tokens) as outputTokens
      FROM usage_logs
      WHERE timestamp >= datetime('now', ?)
    `;
    const params = [daysAgo];

    if (filters.agentId) {
      sql += ` AND agent_id = ?`;
      params.push(filters.agentId);
    }
    if (filters.providerId) {
      sql += ` AND provider_id = ?`;
      params.push(filters.providerId);
    }
    if (filters.modelId) {
      sql += ` AND model_id = ?`;
      params.push(filters.modelId);
    }
    if (filters.projectId) {
      sql += ` AND project_id = ?`;
      params.push(filters.projectId);
    }

    sql += ` GROUP BY date(timestamp) ORDER BY date ASC`;
    return this.db.prepare(sql).all(...params);
  }

  getCostOverTime(timeRange, filters = {}) {
    const daysAgo = this._getDaysAgo(timeRange);
    let sql = `
      SELECT 
        date(timestamp) as date,
        SUM(cost) as cost
      FROM usage_logs
      WHERE timestamp >= datetime('now', ?)
    `;
    const params = [daysAgo];

    if (filters.agentId) {
      sql += ` AND agent_id = ?`;
      params.push(filters.agentId);
    }
    if (filters.providerId) {
      sql += ` AND provider_id = ?`;
      params.push(filters.providerId);
    }
    if (filters.modelId) {
      sql += ` AND model_id = ?`;
      params.push(filters.modelId);
    }
    if (filters.projectId) {
      sql += ` AND project_id = ?`;
      params.push(filters.projectId);
    }

    sql += ` GROUP BY date(timestamp) ORDER BY date ASC`;
    return this.db.prepare(sql).all(...params);
  }

  getCostByProvider(timeRange) {
    const daysAgo = this._getDaysAgo(timeRange);
    const sql = `
      SELECT 
        COALESCE(p.name, 'Unknown') as name,
        SUM(u.cost) as cost
      FROM usage_logs u
      LEFT JOIN providers p ON u.provider_id = p.id
      WHERE u.timestamp >= datetime('now', ?)
      GROUP BY u.provider_id
      ORDER BY cost DESC
    `;
    return this.db.prepare(sql).all(daysAgo);
  }

  getCostByModel(timeRange) {
    const daysAgo = this._getDaysAgo(timeRange);
    const sql = `
      SELECT 
        COALESCE(m.name, 'Unknown') as name,
        SUM(u.cost) as cost
      FROM usage_logs u
      LEFT JOIN models m ON u.model_id = m.id
      WHERE u.timestamp >= datetime('now', ?)
      GROUP BY u.model_id
      ORDER BY cost DESC
    `;
    return this.db.prepare(sql).all(daysAgo);
  }

  getCostByProject(timeRange) {
    const daysAgo = this._getDaysAgo(timeRange);
    const sql = `
      SELECT 
        COALESCE(p.name, 'Unknown') as name,
        SUM(u.cost) as cost
      FROM usage_logs u
      LEFT JOIN projects p ON u.project_id = p.id
      WHERE u.timestamp >= datetime('now', ?)
      GROUP BY u.project_id
      ORDER BY cost DESC
    `;
    return this.db.prepare(sql).all(daysAgo);
  }

  getUsageByModel(timeRange) {
    const daysAgo = this._getDaysAgo(timeRange);
    const sql = `
      SELECT 
        COALESCE(m.name, 'Unknown') as name,
        SUM(u.input_tokens) as inputTokens,
        SUM(u.output_tokens) as outputTokens,
        SUM(u.input_tokens + u.output_tokens) as totalTokens
      FROM usage_logs u
      LEFT JOIN models m ON u.model_id = m.id
      WHERE u.timestamp >= datetime('now', ?)
      GROUP BY u.model_id
      ORDER BY totalTokens DESC
    `;
    return this.db.prepare(sql).all(daysAgo);
  }

  getTokenDistribution(timeRange) {
    const daysAgo = this._getDaysAgo(timeRange);
    const sql = `
      SELECT 
        input_tokens as inputTokens,
        output_tokens as outputTokens,
        timestamp
      FROM usage_logs
      WHERE timestamp >= datetime('now', ?)
      ORDER BY timestamp ASC
    `;
    return this.db.prepare(sql).all(daysAgo);
  }

  _getDaysAgo(timeRange) {
    const days = parseInt(timeRange) || 30;
    return `-${days} days`;
  }
}

module.exports = UsageRepository;
