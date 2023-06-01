import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';

  constructor(private http: HttpClient) { }

  sendEmail(data: any): Observable<any> {
    const headers = {
      Authorization: `Bearer ${environment.sendGridApiKey}`,
      'Content-Type': 'application/json'
    };

    const payload = {
      personalizations: [
        {
          to: [{ email: data.to }],
          subject: data.subject
        }
      ],
      from: { email: 'n00190846@upn.pe' },
      content: [{ type: 'text/html', value: data.body }]
    };

    return this.http.post(this.sendGridUrl, payload, { headers });
  }
}
