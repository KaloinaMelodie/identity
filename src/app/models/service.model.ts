export interface Service {
  id: string;
  contenu?: string | null;
}


export interface ServiceCreate {
  contenu?: string | null;
}

export type ServiceUpdate = Partial<ServiceCreate>;
