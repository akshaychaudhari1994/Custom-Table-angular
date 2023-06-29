import { Injectable } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private apiService: ApiHttpService
  ) { }

  private orderSearch$ = new Subject();
  API_ROUTES = 'http://localhost:3000'

  getOrder(data: any) {
    return this.apiService.post(this.API_ROUTES + '/order/list', data);
  }

  deleteOrder(id: any) {
    return this.apiService.delete(this.API_ROUTES + '/order/delete/' + id);
  }

  createOrder(data: any) {
    return this.apiService.post(this.API_ROUTES + '/order/create', data);
  }

  subscribeOrder() {
    return this.orderSearch$.pipe(
      switchMap((value: any) => {
        let url = this.API_ROUTES;
        return this.apiService.post(url, value);
      })
    )
  }
}
