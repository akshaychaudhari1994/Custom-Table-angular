import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap, map } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public filterSub: any = new BehaviorSubject(true);
  filterObservable = this.filterSub.asObservable();

  constructor(private http: HttpClient,
    private utilService: UtilsService) { }

  resetFilters(filterData: any) {
    delete filterData[filterData.filterFieldName];
    delete filterData['filterSingle'];
    filterData['isShowFilter'] = false;
    filterData.filterOption.map((emt: any) => emt.checked = false);
  }
}
