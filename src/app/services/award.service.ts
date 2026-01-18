import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AwardOut, AwardCreate, AwardUpdate } from '../models/award.model';

@Injectable({ providedIn: 'root' })
export class AwardService {
  private baseUrl = environment.apiUrl + '/awards';

  constructor(private http: HttpClient) {}

  createAward(payload: AwardCreate): Observable<AwardOut> {
    return this.http.post<AwardOut>(this.baseUrl, payload);
  }

  getAwards(): Observable<AwardOut[]> {
    return this.http.get<AwardOut[]>(this.baseUrl).pipe(
      map((awards) => (awards ?? []).slice().sort((a, b) => (a.rang ?? 0) - (b.rang ?? 0)))
    );
  }

  getAwardById(id: string): Observable<AwardOut> {
    return this.http.get<AwardOut>(`${this.baseUrl}/${id}`);
  }

  updateAward(id: string, payload: AwardUpdate): Observable<AwardOut> {
    return this.http.put<AwardOut>(`${this.baseUrl}/${id}`, payload);
  }

  deleteAward(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
