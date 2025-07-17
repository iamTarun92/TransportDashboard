import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'assets/db.json';

  constructor(private http: HttpClient) { }

  getChartData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
