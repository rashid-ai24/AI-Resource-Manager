import { create } from 'zustand';

export const useCommandPaletteStore = create((set) => ({
  isOpen: false,
  searchQuery: '',
  selectedCommand: null,

  openPalette: () => set({ isOpen: true }),
  closePalette: () => set({ isOpen: false, searchQuery: '' }),
  togglePalette: () => set((state) => ({
    isOpen: !state.isOpen,
    searchQuery: state.isOpen ? '' : state.searchQuery,
  })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCommand: (command) => set({ selectedCommand: command }),
  clearSelection: () => set({ selectedCommand: null }),
}));

export default useCommandPaletteStore;
