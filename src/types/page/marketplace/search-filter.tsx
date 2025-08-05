export interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (_query: string) => void;
  selectedCategories?: string[];
  onCategoryChange?: (_categories: string[]) => void;
  sortBy?: string;
  onSortChange?: (_sort: string) => void;
}
