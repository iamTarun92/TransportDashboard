import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Root } from '../data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/db.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Root> {
    return this.http.get<Root>(this.jsonUrl);
  }

  onFilterChange(fromDate: string, toDate: string, location: string): Observable<any> {
    return this.http.get<any>(`${this.jsonUrl}?fromDate=${fromDate}&toDate=${toDate}&location=${location}`);
  }
}
