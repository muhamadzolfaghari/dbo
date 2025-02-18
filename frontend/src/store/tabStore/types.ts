import { TabMode } from '@/core/enums';
import { FilterType, SortType, TabType } from '@/types/Tab';

export type TabFilterSlice = {
  upsertFilters: (filter: FilterType) => Promise<void>;
  removeFilter: (filter: FilterType) => void;
  setShowFilters: (show: boolean) => void;
};

export type TabSortSlice = {
  upsertSorts: (sort: SortType) => Promise<void>;
  removeSort: (sort: SortType) => void;
  setShowSorts: (show: boolean) => void;
};

export type TabSettingSlice = {
  addTab: (table: string, mode?: TabMode, query?: string) => void;
  removeTab: (tabId: string) => void;
  switchTab: (tabId: string | null) => void;
};

export type TabQuerySlice = {
  getQuery: () => string;
  updateQuery: (query: string) => void;
  setShowQueryPreview: (show: boolean) => void;
};

export type TabDataSlice = {
  setShowColumns: (show: boolean) => void;
  updateColumns: (columns: string[]) => void;
};

export type TabStore = {
  tabs: TabType[];
  selectedTab: TabType | undefined;
  updateTabs: (tabs: TabType[]) => void;
  updateSelectedTab: (selectedTab: TabType | undefined) => void;
};
