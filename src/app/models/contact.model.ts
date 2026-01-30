export interface Contact {
  id: string;
  name: string;
  email: string | null;
  date?: string | null;
  contenu?: string | null;
  
}


export interface ContactCreate {
  name: string;
  email: string | null;
  date?: string | null;
  contenu?: string | null;
}

export type ContactUpdate = Partial<ContactCreate>;
