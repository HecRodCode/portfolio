import { IconName } from '../../shared/ui/icon/icon';

export interface NavItem {
  /** Translation key suffix: `nav.<key>` */
  readonly key: 'home' | 'about' | 'projects' | 'contact';
  /** Path under `/:lang` */
  readonly path: string;
  readonly icon: IconName;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', path: '', icon: 'home' },
  { key: 'about', path: 'about', icon: 'user' },
  { key: 'projects', path: 'projects', icon: 'code' },
  { key: 'contact', path: 'contact', icon: 'mail' },
];
