import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';
  constructor(private httpClient: HttpClient){}

  sendEmail(subject:string, body: string, blobName: string){
    const email = {
      Subject: subject,
      Body: body,
      BlobName: blobName
    }
    return this.httpClient.post<any>(`${this.url}/Email`, email).pipe()
  }
}
