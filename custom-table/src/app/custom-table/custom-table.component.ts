import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RowAction {
  name: string,
  displayName: string,
  tooltip?: string,
  icon: string,
  type?: "normal" | "primary" | "accent" | "warn",
  isVisibleColumn?: string,
  isDisabledColumn?: string,
  iconColor?: string
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableData!: any[]; // Input data for the table
  @Input() tableColumns!: string[];
  @Input() isFilterable!: boolean;
  @Input() isPageable!: boolean;
  @Input() paginationSizes!: number[];
  @Input() defaultPageSize!: number;
  @Input() rowActionIcon!: string;
  @Input() actions!: RowAction[];

  @Output() sorting: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = []; // Define the columns for your table


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.tableData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getPrimaryActions(item?: any): RowAction[] {
    return this.actions.filter((action) => action).slice(0, 1);
  }

  // getOtherActions(item): RowAction[] {    
  //   return this.actions.filter((action) => {
  //     // if (action.isVisibleColumn) {
  //     //   return item.actionVisible;
  //     // }
  //     if (action.visibleAction == true || action.visibleAction == false) {
  //       return action?.permission ? action.permission?.includes(item?.statusLabelType) && item.actionVisible == action.visibleAction : true
  //     }
  //     else {
  //       return action?.permission ? action?.permission?.includes(item?.statusLabelType) : true
  //     }
  //   }).slice(1);
  // }

  onRowAction(action: string) {
    this.rowAction.emit({ action});
  }


}