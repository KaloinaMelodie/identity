export interface TechnoImageIn {
  image: string; // base64/dataURL (admin create/update)
  alt: string;
}

export interface TechnoImageOut {
  url: string;
  key?: string;
  alt: string;
}

export interface TechnoCreate {
  titre: string;
  categorie: string;
  image?: TechnoImageIn | null;
  chapo?: string | null;
}

export type TechnoUpdate = Partial<TechnoCreate>;

export interface TechnoOut {
  id: string;
  titre: string;
  categorie: string;
  image?: TechnoImageOut | null;
  chapo?: string | null;
}

export interface TechnoGroupOut {
  categorie: string;
  technos: TechnoOut[]; // max 4
}
