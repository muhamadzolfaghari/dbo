import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { TabType } from '@/types';

import { immer } from 'zustand/middleware/immer';
import { createTabColumnSlice } from './slices/tabColumn.slice';
import { createTabFilterSlice } from './slices/tabFilter.slice';
import { createTabQuerySlice } from './slices/tabQuery.slice';
import { createTabSettingSlice } from './slices/tabSetting.slice';
import { createTabSortSlice } from './slices/tabSort.slice';
import { TabDataSlice, TabFilterSlice, TabQuerySlice, TabSettingSlice, TabSortSlice, TabStore } from './types';

type TabState = TabStore & TabSettingSlice & TabQuerySlice & TabFilterSlice & TabSortSlice & TabDataSlice;

export const useTabStore = create<TabState>()(
  devtools(
    persist(
      immer((set, get, state) => ({
        tabs: [],
        selectedTab: undefined,
        updateTabs: (tabs: TabType[]) => {
          set({ tabs });
        },
        updateSelectedTab: (selectedTab: TabType | undefined) => {
          if (selectedTab == undefined) {
            set({ selectedTab });
            return;
          }

          const tabs = get().tabs.map((t: TabType) => {
            if (t.id == selectedTab.id) {
              return selectedTab;
            }
            return t;
          });

          set({ tabs, selectedTab });
        },
        ...createTabSettingSlice(set, get, state),
        ...createTabQuerySlice(set, get, state),
        ...createTabFilterSlice(set, get, state),
        ...createTabSortSlice(set, get, state),
        ...createTabColumnSlice(set, get, state)
      })),
      { name: 'tabs' }
    ),
    {
      name: 'tabs'
    }
  )
);
