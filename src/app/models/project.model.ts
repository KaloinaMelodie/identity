export interface ProjectLink {
  lien: string;
  titre: string;
}

export interface ProjectImageOut {
  url: string;
  key?: string;
  alt: string;
}

export interface ProjectOut {
  id: string;
  titre: string;
  rang: number;
  image?: ProjectImageOut | null;
  categories: string[];
  technos: string[];
  datedebut?: string | null;
  datefin?: string | null;
  soustitre?: string | null;
  chapo?: string | null;
  contenu?: string | null;
  liens: ProjectLink[];
  images: ProjectImageOut[];
}


export interface ProjectImageIn {
  image: string; // base64 ou dataURL
  alt: string;
}

export interface ProjectCreate {
  titre: string;
  rang: number;
  image?: ProjectImageIn | null;
  categories: string[];
  technos: string[];
  datedebut?: string | null;
  datefin?: string | null;
  soustitre?: string | null;
  chapo?: string | null;
  contenu?: string | null;
  liens: ProjectLink[];
  images: ProjectImageIn[];
}

export type ProjectUpdate = Partial<ProjectCreate>;
