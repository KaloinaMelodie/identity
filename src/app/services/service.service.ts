import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Service, ServiceCreate, ServiceUpdate } from '../models/service.model';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private baseUrl = environment.apiUrl + '/services';

  constructor(private http: HttpClient) {}

  createService(payload: ServiceCreate): Observable<Service> {
    return this.http.post<Service>(this.baseUrl, payload);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }

  getService(): Observable<Service | null> {
    return this.http.get<Service[]>(this.baseUrl).pipe(
      map(services => services.length > 0 ? services[0] : null)
    );
  }

  getServiceById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/${id}`);
  }

  updateService(id: string, payload: ServiceUpdate): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/${id}`, payload);
  }

  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
