import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UtilsService } from '../services/utils.service';
import { RowAction } from '../custom-table/custom-table.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {

  loadingTxt: any = "Loading..."
  @Input() tableColumns: any[] = [];
  @Input() tableData: any[] = [];
  @Input() filters: any[] = [];
  @Input() loadingfilters: boolean = false;

  @Input() isFilterable!: boolean;
  @Input() isPageable!: boolean;
  @Input() paginationSizes!: number[];
  @Input() defaultPageSize!: number;
  @Input() rowActionIcon!: string;
  @Input() actions!: RowAction[];
  filteredData: any[] = []; // New array to hold filtered data

  @Output() sorting: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowClickedEvent = new EventEmitter<any>();
  @Output() filterChangeEvent = new EventEmitter<any>();
  @Output() onFilterScrollTab = new EventEmitter<any>();

  clickedFilter: any;
  constructor(public utilsService: UtilsService,
    private _commonService: CommonService) { }

  ngOnInit(): void {
    this.filteredData = [...this.tableData];
    this.updatePagination()
    this._commonService.filterObservable.subscribe((data: any) => {
      if (this.clickedFilter && this.clickedFilter.isShowFilter) {
        this.clickedFilter.isShowFilter = data
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      if (!changes['tableData']['firstChange'] && (changes['tableData']['currentValue']).length <= 0) {
        this.loadingTxt = "No Data found!!";
      } else {
        this.filteredData = [...this.tableData];
      }
    }
  }

  currentPage: number = 1;
  // pageSize: number = this.defaultPageSize;
  totalPages: number = 0;

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredData.length / this.defaultPageSize);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  
  getPrimaryActions(item?: any): RowAction[] {
    return this.actions.filter((action) => action).slice(0, 1);
  }

  applyFilter(e: any) {
    if (e.target.value) {
      this.filteredData = this.tableData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      this.filteredData = [...this.tableData];
    }
    this.currentPage = 1; // Reset current page when filtering
    this.updatePagination();
  }

  rowClicked(item: any,index:number) {
    this.rowClickedEvent.emit(item);
  }

  chkfilterApplied(filterFieldName: any) {
    return this.filters.hasOwnProperty(filterFieldName);
  }

  showFilter(head: any) {
    this.clickedFilter = head;
    head.isShowFilter = !head.isShowFilter;
    this.tableColumns.map(emt => { if (emt.id !== head.id) emt.isShowFilter = false });
  }

}
