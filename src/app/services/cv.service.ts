import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private baseUrl = environment.apiUrl + '/cv';

  constructor(private http: HttpClient) {}

  downloadCV(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download`, {
      responseType: 'blob' 
    });
  }
}