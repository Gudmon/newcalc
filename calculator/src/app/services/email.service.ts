import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  //private url = 'http://localhost:5140';
  private url = 'https://calculator-app-api.azurewebsites.net';
  constructor(private httpClient: HttpClient){}

  sendEmail(fromEmail: string, subject:string, body: string, name: string, countryCode: string, phoneNumber:string, blobName: string){
    const email = {
      FromEmail: fromEmail,
      Subject: subject,
      Body: body,
      Name: name,
      CountryCode: countryCode,
      PhoneNumber: phoneNumber,
      BlobName: blobName
    }
    return this.httpClient.post<any>(`${this.url}/Email`, email).pipe()
  }

  sendCompetitionEmail(fromEmail: string, subject:string, name: string, countryCode: string, phoneNumber:string, 
    businessForm: string, category: string, kata: string, businessYear: string, manPower: string, revenue: string
  ){
    const email = {
      FromEmail: fromEmail,
      Subject: subject,
      Name: name,
      CountryCode: countryCode,
      PhoneNumber: phoneNumber,
      BusinessForm: businessForm,
      Category: category,
      Kata: kata,
      BusinessYear: businessYear,
      ManPower: manPower,
      Revenue: revenue,
    }
    return this.httpClient.post<any>(`${this.url}/Email/competition`, email).pipe()
  }
}
