export interface ProjectLink {
  lien: string;
  titre: string;
}

export interface ProjectImage {
  image: string;
  alt: string;
}

export interface Project {
  id?: string; 
  titre: string;
  categories: string[];
  technos: string[];
  datedebut?: string | null;
  datefin?: string | null;
  soustitre?: string | null;
  chapo?: string | null;
  contenu?: string | null;
  liens: ProjectLink[];
  images: ProjectImage[];
}
