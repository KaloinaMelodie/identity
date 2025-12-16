import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ProjectOut, ProjectCreate, ProjectUpdate } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private baseUrl = environment.apiUrl + '/projects';

  constructor(private http: HttpClient) {}

  createProject(payload: ProjectCreate): Observable<ProjectOut> {
    return this.http.post<ProjectOut>(this.baseUrl, payload);
  }

  getProjects(): Observable<ProjectOut[]> {
    return this.http.get<ProjectOut[]>(this.baseUrl).pipe(
      map((projects) => (projects ?? []).slice().sort((a, b) => (a.rang ?? 0) - (b.rang ?? 0)))
    );
  }

  getProjectById(id: string): Observable<ProjectOut> {
    return this.http.get<ProjectOut>(`${this.baseUrl}/${id}`);
  }

  updateProject(id: string, payload: ProjectUpdate): Observable<ProjectOut> {
    return this.http.put<ProjectOut>(`${this.baseUrl}/${id}`, payload);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
