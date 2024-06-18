import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private url = 'http://localhost:5140';
  // private url = 'https://calculator-app-api.azurewebsites.net';

  constructor(private httpClient: HttpClient,) {}

  sendDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('File', file);
    const headers = new HttpHeaders();

    return this.httpClient.post<void>(`${this.url}/Email/file`, formData, { headers });
  }
}
