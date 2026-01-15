import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Experience, ExperienceCreate, ExperienceUpdate } from '../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private baseUrl = environment.apiUrl + '/experiences';

  constructor(private http: HttpClient) {}

  createExperience(payload: ExperienceCreate): Observable<Experience> {
    return this.http.post<Experience>(this.baseUrl, payload);
  }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.baseUrl).pipe(
      map((experiences) => (experiences ?? []).slice().sort((a, b) => (a.rang ?? 0) - (b.rang ?? 0)))
    );
  }

  getExperienceById(id: string): Observable<Experience> {
    return this.http.get<Experience>(`${this.baseUrl}/${id}`);
  }

  updateExperience(id: string, payload: ExperienceUpdate): Observable<Experience> {
    return this.http.put<Experience>(`${this.baseUrl}/${id}`, payload);
  }

  deleteExperience(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
