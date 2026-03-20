export interface FooterNavigationItem {
  label: string;
  href: string;
}

export interface FooterProps {
  whatsappUrl: string;
  navigationItems?: readonly FooterNavigationItem[];
}
