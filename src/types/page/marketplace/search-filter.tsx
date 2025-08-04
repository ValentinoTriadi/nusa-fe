export interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}