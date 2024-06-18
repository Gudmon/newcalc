import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';
  constructor(private httpClient: HttpClient){}

  sendEmail(fromEmail: string, subject:string, body: string, name: string, blobName: string){
    const email = {
      FromEmail: fromEmail,
      Subject: subject,
      Body: body,
      Name: name,
      BlobName: blobName
    }
    return this.httpClient.post<any>(`${this.url}/Email`, email).pipe()
  }
}
