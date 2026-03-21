export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  navigationItems?: readonly NavigationItem[];
}
