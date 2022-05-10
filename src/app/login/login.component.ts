import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:any = [];
  submitted = false;
  formvalue:any;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^[6789]+[0-9]{9}$')]],
      password: ['', [Validators.required]],
  }); 
  if(localStorage.getItem('password') && localStorage.getItem('username')){
    this.loginform.controls.phoneNumber.value = localStorage.getItem('username');;
    this.loginform.controls.password.value = localStorage.getItem('password');
  }
  }

  get f() { return this.loginform.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginform.invalid) {
        return;
    }
    else{
      this.router.navigate(['/orders']);
    }
  }

  remember() {
    localStorage.setItem('password',this.loginform.controls.password.value);
    localStorage.setItem('username',this.loginform.controls.phoneNumber.value);
  }

}
