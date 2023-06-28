import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  constructor(private http: HttpClient) { }

  public get(url: string, options?: any) {
    return this.http.get<any>(url, options);
  }
  public post(url: string, data: any, options?: any) {
    return this.http.post<any>(url, data, options);
  }
  public put(url: string, data: any, options?: any) {
    return this.http.put<any>(url, data, options);
  }
  public delete(url: string, data?: any) {
    return this.http.delete<any>(url, { body: data });
  }
}
