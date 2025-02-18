import { tools } from '@/core/utils';
import { StateCreator } from 'zustand';
import { TabQuerySlice, TabStore } from '../types';

export const createTabQuerySlice: StateCreator<TabStore & TabQuerySlice, [], [], TabQuerySlice> = (_, get) => ({
  getQuery: (): string => {
    const selectedTab = get().selectedTab;
    if (!selectedTab) {
      return '';
    }

    if (tools.isValidJSON(selectedTab.query)) {
      return JSON.parse(selectedTab.query);
    }

    return selectedTab.query;
  },
  updateQuery: (query: string) => {
    const selectedTab = get().selectedTab;
    if (!selectedTab) {
      return;
    }

    if (!tools.isValidJSON(query)) {
      query = JSON.stringify(query);
    }

    selectedTab.query = query;
    get().updateSelectedTab(selectedTab);
  },
  setShowQueryPreview: (show: boolean) => {
    const selectedTab = get().selectedTab;
    if (!selectedTab) {
      return;
    }

    selectedTab.showQuery = show;
    get().updateSelectedTab(selectedTab);
  }
});
