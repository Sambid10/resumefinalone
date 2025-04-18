import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type Layout = 'Classic' | 'Modern';

interface LayoutStore {
  layouts: Record<string, Layout>; // Store layouts for each resume by resumeId
  setLayout: (resumeId: string, layout: Layout) => void; // Set layout for a specific resume
}

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      layouts: {},
      setLayout: (resumeId, layout) =>
        set((state) => ({
          layouts: {
            ...state.layouts,
            [resumeId]: layout,
          },
        })),
    }),
    {
      name: 'resume-layouts', // Key in localStorage
    }
  )
);