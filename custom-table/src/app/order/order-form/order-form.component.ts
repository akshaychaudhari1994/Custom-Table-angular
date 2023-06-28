import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  myForm!: FormGroup
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<OrderFormComponent>) { }


  ngOnInit() {
    this.myForm = this.formBuilder.group({
      productName: ['', Validators.required],
      amount: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.myForm?.valid) {
      // Process form data here
      console.log(this.myForm.value);
      this.orderService.createOrder(this.myForm.value).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (response: any) => {
          this.spinner.hide()
          this.dialogRef.close()
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
}