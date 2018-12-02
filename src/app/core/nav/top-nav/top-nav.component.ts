import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import {NavService} from '../../../nav.service';
import { AuthenticationService, LoggedInUser } from '../../../pages/_services';
import {MessageService} from '../../../_services/message.service';
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

  constructor(
    public navService: NavService,
    private authService: AuthenticationService,
    private messageService: MessageService,
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
}

