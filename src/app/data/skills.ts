import { IconName } from '../shared/ui/icon/icon';

export interface Skill {
  /** Technology names are proper nouns, so they are not translated. */
  readonly name: string;
  /** File in `public/images/tech/` (without extension) */
  readonly logo?: string;
  /** Variant for the dark theme, for logos whose dark parts disappear against it */
  readonly logoDark?: string;
  /** Generic icon for technologies without a brand logo */
  readonly icon?: IconName;
}

export interface SkillGroup {
  /** Translation key suffix: `about.skills.groups.<key>` */
  readonly key: 'web' | 'backend' | 'data' | 'infra';
  /** Group accent: the active palette's primary or secondary color */
  readonly tone: 'primary' | 'secondary';
  /** Badge next to the group title */
  readonly icon: IconName;
  readonly items: readonly Skill[];
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    key: 'web',
    tone: 'primary',
    icon: 'laptop',
    items: [
      { name: 'Angular', logo: 'angular' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'HTML', logo: 'html5' },
      { name: 'CSS', logo: 'css3' },
    ],
  },
  {
    key: 'backend',
    tone: 'secondary',
    icon: 'server',
    items: [
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'NestJS', logo: 'nestjs' },
      { name: 'Python', logo: 'python' },
      { name: 'FastAPI', logo: 'fastapi' },
    ],
  },
  {
    key: 'data',
    tone: 'secondary',
    icon: 'database',
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
    tone: 'primary',
    icon: 'cloud',
    items: [
      { name: 'AWS', logo: 'aws', logoDark: 'aws-dark' },
      { name: 'Docker', logo: 'docker' },
      { name: 'Nginx', logo: 'nginx' },
      { name: 'Git', logo: 'git' },
      { name: 'GitHub Actions', logo: 'githubactions' },
      { name: 'Cloudflare', logo: 'cloudflare' },
    ],
  },
];
