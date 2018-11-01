import { Component, OnInit, AfterViewInit } from '@angular/core';
import {NavService} from '../../../nav.service';
import { AuthenticationService } from '../../../pages/_services';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, AfterViewInit {
  username: string;
  token_expires: Date;
  hidden: boolean = true;

  constructor(
    public navService: NavService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.updateData();
  }
  ngAfterViewInit() {
    this.updateData;
  }
  logOut() {
    this.authService.logout()
  }

  updateData() {
    let token = localStorage.getItem('currentUser')
    if (token) {
      let errors = [];

      const token_parts = token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      this.token_expires = new Date(token_decoded.exp * 1000);
      this.username = token_decoded.username;
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }
}
