import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import {NavService} from '../../../nav.service';
import { AuthenticationService, LoggedInUser } from '../../../pages/_services';
import {Observable} from 'rxjs';
import {ThemeService} from '../../services/theme.service';

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
  isDarkTheme: Observable<boolean>;
  isLoggedIn$: Observable<boolean>; 
  isLoggedInUser: string;
  jwt: string;

  constructor(
    public navService: NavService,
    private authService: AuthenticationService,
    private themeService: ThemeService,

  ) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    this.authService.currentUser.subscribe(user => this.isLoggedInUser = user )
  }
  ngAfterViewInit() {
  }
  logOut() {
    this.authService.logout()
    this.username = null;
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
  checkJwt() {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedInUser = user
      console.log(user)
    })
  }
  
}

export interface Jwt {
  user_id: number;
  username: string;
  exp: number;
  email: string;
}