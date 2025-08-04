export interface TabSwitcherProps {
  activeTab: 'produk' | 'mitra';
  onTabChange: (_tab: 'produk' | 'mitra') => void;
}
