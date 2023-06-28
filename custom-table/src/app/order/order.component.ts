import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { RowAction } from './../custom-table/custom-table.component';
import { HEADERS } from './../data-table/table-header';
import { OrderService } from './../services/order.service';
import { UtilsService } from './../services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormComponent } from './order-form/order-form.component';

export interface Order {
  id?: string;
  name: string;
  age: number;
  email: string;
}

export enum Actions {
  REMOVE_SHOPPING_CART = 'remove_shopping_cart'
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private orderService: OrderService,
    private toastrService: ToastrService,
    public utilService: UtilsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) {
  }
  totalPages: number = 0
  orders!: Order[];
  ordersTableColumns = HEADERS.orderTable
  filters: any = {
    currentPage: 1,
    limit: 5
  };

  ngOnInit(): void {
    this.orders = []
    this.getOrders(this.filters)
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: "1080px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOrders(this.filters)
    });
  }

  actionConfig: RowAction[] = [
    { name: Actions.REMOVE_SHOPPING_CART, displayName: "remove_shopping_cart", tooltip: "remove_shopping_cart", icon: "remove_shopping_cart", iconColor: "red" },
    { name: Actions.REMOVE_SHOPPING_CART, displayName: "remove_shopping_cart", tooltip: "remove_shopping_cart", icon: "remove_shopping_cart", iconColor: "#304FFE" },
  ]

  onRowAction(event: any) {
    switch (event.action) {
      case Actions.REMOVE_SHOPPING_CART:
        this.orders.splice(event.index, 1);
        break;
    }
  }

  onPageChange(e: any) {
    this.filters.currentPage = e
    this.getOrders(this.filters);
  }

  sortData(e: any) {
    this.filters.sortBy = e.column
    this.filters.sortOrder = e.direction
    this.getOrders(this.filters)
  }

  removeOrder(e: any) { }

  getOrders(data: any) {
    this.spinner.show()
    this.orderService.getOrder(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (response: any) => {
        this.spinner.hide()
        this.orders = response.data
        this.totalPages = response.totalDocs
      },
      error: (error: any) => {
        this.spinner.hide()
        if (error?.error?.content) {
          this.toastrService.error(error?.error?.content, "Error");
        } else {
          this.toastrService.error(error?.message, "Error");
        }
      }
    });
  }
}

