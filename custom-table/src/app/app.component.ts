import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RowAction } from './custom-table/custom-table.component';
import { HEADERS } from './data-table/table-header';

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

  title = 'custom-table';
  orders!: Order[];
  // ordersTableColumns: string[] = ['name', 'age', 'email', 'actions'];
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
    { name: Actions.REMOVE_SHOPPING_CART, displayName: "remove_shopping_cart", tooltip: "remove_shopping_cart", icon: "remove_shopping_cart", iconColor: "#304FFE" },
  ]

  sortData(e: any) { }
  removeOrder(e: any) { }
}
