import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RowAction } from './custom-table/custom-table.component';
import { HEADERS } from './data-table/table-header';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from './services/order.service';
import { UtilsService } from './services/utils.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private orderService: OrderService,
    private toastrService: ToastrService,
    public utilService: UtilsService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }
  title = 'custom-table';
  orders!: Order[];
  ordersTableColumns = HEADERS.orderTable
  ngOnInit(): void {
    this.orders = [
      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },
      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      { name: 'John Doe', age: 25, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
      { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },

      // Add more objects as needed
    ];
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

  sortData(e: any) {
    console.log(e);
  }

  removeOrder(e: any) { }


  getEvents(data: any) {
    this.spinner.show()
    this.orderService.getOrder(data).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (response: any) => {
        this.spinner.hide()
        if (response?.code === 200) {
        }
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
