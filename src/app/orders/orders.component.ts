import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any = [];
  closeResult = '';
  data:any = {};
  orderform:any = [];
  submitted = false;
  id = 0;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.orderform = this.formBuilder.group({
      customerPhone: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^[6789]+[0-9]{9}$')]],
      orderNumber: ['', [Validators.required]],
      customerAddress: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      orderTotal: ['', [Validators.required]],
      orderDueDate: ['', [Validators.required]],
    }); 
  }

  get f() { return this.orderform.controls; }

  add(content:any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  

  edit(content:any, data:any) { 
    this.data = data;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(data:any) {
    this.data = data;
    Swal.fire({
      title: 'Are You Sure To Delete ' + this.data.orderNumber + '?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        for(let d = 0; d < this.orders.length; d++){
          if(this.orders[d].orderNumber === this.data.orderNumber){
            this.orders.splice(d, 1);
          }
        }
        Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Order are not Deleted', '', 'info')
      }
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  save() {
    // console.log('clicked');
    this.submitted = true;

    // stop here if form is invalid
    if (this.orderform.invalid) {
        return;
    }
    else{
      this.id = this.id + 1;
      this.data.id = this.id
      this.orders.push(this.data);

   Swal.fire( 'Good job!','Order Added Successfully!','success');
         
    this.modalService.dismissAll();
    this.data = {};
    this.ngOnInit();
    }
   
  }

  save2() {
    // console.log('clicked');
    this.submitted = true;

    // stop here if form is invalid
    if (this.orderform.invalid) {
        return;
    }
    else{
      for(let d of this.orders){
        if(d.id === this.data.id){
          d = this.data;
        }
      }
      // this.orders.push(this.data);

   Swal.fire( 'Good job!','Order Edited Successfully!','success');
         
    this.modalService.dismissAll();
    this.data = {};
    this.ngOnInit();
    }
   
  }


}
