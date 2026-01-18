export interface AwardLink {
  lien: string;
  titre: string;
}

export interface AwardImageOut {
  url: string;
  key?: string;
  alt: string;
}

export interface AwardOut {
  id: string;
  titre: string;
  rang: number;
  image?: AwardImageOut | null;
  datedebut?: string | null;
  datefin?: string | null;
  chapo?: string | null;
  contenu?: string | null;
  liens: AwardLink[];
  images: AwardImageOut[];
}


export interface AwardImageIn {
  image: string; // base64 ou dataURL
  alt: string;
}

export interface AwardCreate {
  titre: string;
  rang: number;
  image?: AwardImageIn | null;
  datedebut?: string | null;
  datefin?: string | null;
  chapo?: string | null;
  contenu?: string | null;
  liens: AwardLink[];
  images: AwardImageIn[];
}

export type AwardUpdate = Partial<AwardCreate>;
