export interface ExperienceItem {
  /** Translation key suffix: `about.experience.items.<key>.{period,role,place,description}` */
  readonly key: string;
}

/** Work experience, newest first. Empty until real entries are added (the section shows a notice). */
export const EXPERIENCE: readonly ExperienceItem[] = [];
