export interface SocialLink {
  name: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
}


export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  url?: string;
  pdf?: string;
}

export interface HomepageData {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  socialLinks: SocialLink[];
  projects: Project[];

  researchInterests: string[];
  publications: Publication[];
}
