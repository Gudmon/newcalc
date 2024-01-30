import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url = "https://formspree.io/f/xyyrkaql"
  constructor(private http: HttpClient){}

  sendEmail(data: any) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xyyrkaql',
        { name: data.name, replyto: data.email, message: data.message },
        { 'headers': headers }).subscribe(
          (response:any) => {
            console.log(response);
          }
        );
  }
}
