import { IconName } from '../shared/ui/icon/icon';

export interface Skill {
  /** Technology names are proper nouns, so they are not translated. */
  readonly name: string;
  /** Short qualifier shown under the name */
  readonly note?: string;
  /** File in `public/images/tech/` (without extension) */
  readonly logo?: string;
  /** Takes a full row in the tile grid (long names) */
  readonly wide?: boolean;
  /** Generic icon for technologies without a brand logo */
  readonly icon?: IconName;
}

export interface SkillGroup {
  /** Translation key suffix: `about.skills.groups.<key>` */
  readonly key: 'web' | 'data' | 'infra';
  /** Group accent: the active palette's primary / secondary color, or neutral */
  readonly tone: 'primary' | 'secondary' | 'neutral';
  readonly items: readonly Skill[];
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    key: 'web',
    tone: 'primary',
    items: [
      { name: 'Angular', logo: 'angular' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'NestJS', logo: 'nestjs' },
    ],
  },
  {
    key: 'data',
    tone: 'secondary',
    items: [
      { name: 'Python', logo: 'python' },
      { name: 'SQL', icon: 'database' },
      { name: 'PostgreSQL', logo: 'postgresql' },
      { name: 'Power BI', logo: 'powerbi' },
      { name: 'Excel', logo: 'excel' },
    ],
  },
  {
    key: 'infra',
    tone: 'neutral',
    items: [
      { name: 'AWS', logo: 'aws' },
      { name: 'Docker', logo: 'docker' },
      { name: 'Nginx', logo: 'nginx' },
      { name: 'Git', logo: 'git' },
      { name: 'GitHub Actions', note: 'CI/CD', logo: 'githubactions', wide: true },
    ],
  },
];
