import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Contact, ContactCreate, ContactUpdate } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private baseUrl = environment.apiUrl + '/contacts';

  constructor(private http: HttpClient) {}

  createContact(payload: ContactCreate): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl, payload);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl).pipe(
      map((contacts) => (contacts ?? []).slice())
    );
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  updateContact(id: string, payload: ContactUpdate): Observable<Contact> {
    return this.http.put<Contact>(`${this.baseUrl}/${id}`, payload);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
