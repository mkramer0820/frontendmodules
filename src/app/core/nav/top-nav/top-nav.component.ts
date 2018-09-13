import { Component, OnInit } from '@angular/core';
import {NavService} from '../../../nav.service';
import { AuthenticationService } from '../../../pages/_services';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(
    public navService: NavService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }
  logOut() {
    this.authService.logout()
  }
}
