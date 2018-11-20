import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import {HttpClientService} from '../../_services/http-client.service'
import {MessageService} from '../../_services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private router: Router,
     private authenticationService: AuthenticationService,
     private httpClientSerivce: HttpClientService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer-table';
  }

  get f() { return this.loginForm.controls; }

   onSubmit() {
       this.submitted = true;

       // stop here if form is invalid
       if (this.loginForm.invalid) {
           return;
       }

       this.loading = true;
       this.httpClientSerivce.login(this.f.username.value, this.f.password.value)
           .pipe(first())
           .subscribe(
               data => {
                   this.router.navigate([this.returnUrl]);
               },
               error => {
                   this.error = error;
                   this.loading = false;
                   console.log('Login Error')
                   this.httpClientSerivce.openSnackBar('Try Again Incorrect user Name')
               });
   }
   getJwt() {
     let token = localStorage.getItem('currentUser')
     console.log(token)
   }
}
