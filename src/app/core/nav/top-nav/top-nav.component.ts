import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import {NavService} from '../../../nav.service';
import { AuthenticationService } from '../../../pages/_services';
import {MessageService} from '../../../_services/message.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, AfterViewInit {
  username: string;
  token_expires: Date;
  hidden: boolean = true;
  user: any;

  constructor(
    public navService: NavService,
    private authService: AuthenticationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.updateData();
  }
  ngAfterViewInit() {
    this.updateData();
  }
  logOut() {
    this.authService.logout()
    this.username = null;
  }

  updateData() {
    let username = this.messageService.getUsername();
    console.log(username)
    /*if (username) {
      let errors = [];

      const token_parts = username.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      this.token_expires = new Date(token_decoded.exp * 1000);
      this.username = token_decoded.username;
      console.log(this.username)
      this.hidden = false;
    } else {
      this.hidden = true;
    }*/
  }
}
