import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  isOpen: true,
  isCollapsed: false,
  activeItem: null,

  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setActiveItem: (item) => set({ activeItem: item }),
  clearActiveItem: () => set({ activeItem: null }),
}));

export default useSidebarStore;
