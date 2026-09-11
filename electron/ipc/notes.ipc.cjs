const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');
const { NoteCreateSchema, NoteUpdateSchema, ListFilterSchema } = require('../lib/validators.cjs');

function registerNoteHandlers() {
  const repo = repositories.notes;

  ipcMain.handle('notes:list', async (event, filters = {}) => {
    try {
      const validatedFilters = ListFilterSchema.parse(filters);
      const data = repo.findAllWithRelations(validatedFilters);
      return { success: true, data };
    } catch (error) {
      console.error('notes:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notes:get', async (event, id) => {
    try {
      const data = repo.findByIdWithRelations(id);
      if (!data) {
        return { success: false, error: 'Note not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('notes:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notes:create', async (event, data) => {
    try {
      const validated = NoteCreateSchema.parse(data);
      const note = repo.create(validated);
      const noteData = repo.findByIdWithRelations(note.id);
      repositories.activity.log('note', note.id, note.title, 'created', '');
      return { success: true, data: noteData };
    } catch (error) {
      console.error('notes:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notes:update', async (event, id, data) => {
    try {
      const validated = NoteUpdateSchema.parse(data);
      repo.update(id, validated);
      const note = repo.findByIdWithRelations(id);
      if (!note) {
        return { success: false, error: 'Note not found' };
      }
      repositories.activity.log('note', id, note.title, 'updated', '');
      return { success: true, data: note };
    } catch (error) {
      console.error('notes:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notes:delete', async (event, id) => {
    try {
      const note = repo.findById(id);
      if (!note) {
        return { success: false, error: 'Note not found' };
      }
      repo.delete(id);
      repositories.activity.log('note', id, note.title, 'deleted', '');
      return { success: true, data: { id } };
    } catch (error) {
      console.error('notes:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerNoteHandlers };
