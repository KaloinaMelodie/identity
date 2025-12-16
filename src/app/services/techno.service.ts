import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { TechnoCreate, TechnoOut, TechnoUpdate, TechnoGroupOut } from '../models/techno.model';

@Injectable({ providedIn: 'root' })
export class TechnoService {
  private baseUrl = environment.apiUrl + '/technos';

  constructor(private http: HttpClient) {}

  createTechno(payload: TechnoCreate): Observable<TechnoOut> {
    return this.http.post<TechnoOut>(this.baseUrl, payload);
  }

  getTechnos(): Observable<TechnoOut[]> {
    return this.http.get<TechnoOut[]>(this.baseUrl);
  }

  getTechnoById(id: string): Observable<TechnoOut> {
    return this.http.get<TechnoOut>(`${this.baseUrl}/${id}`);
  }

  updateTechno(id: string, payload: TechnoUpdate): Observable<TechnoOut> {
    return this.http.put<TechnoOut>(`${this.baseUrl}/${id}`, payload);
  }

  deleteTechno(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getGroupedTechnos(): Observable<TechnoGroupOut[]> {
    return this.http.get<TechnoGroupOut[]>(`${this.baseUrl}/grouped`);
  }
}
