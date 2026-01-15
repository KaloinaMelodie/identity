export interface ExperienceLink {
  lien: string;
  titre: string;
}

export interface Experience {
  id: string;
  titre: string;
  rang: number;
  organisation: string | null;
  datedebut?: string | null;
  datefin?: string | null;
  chapo?: string | null;
  contenu?: string | null;
  liens: ExperienceLink[];
}


export interface ExperienceCreate {
  titre: string;
  rang: number;
  organisation: string | null;
  datedebut?: string | null;
  datefin?: string | null;
  chapo?: string | null;
  contenu?: string | null;
  liens: ExperienceLink[];
}

export type ExperienceUpdate = Partial<ExperienceCreate>;
