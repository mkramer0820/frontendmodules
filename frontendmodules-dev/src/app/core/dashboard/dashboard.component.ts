import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import {FactoryContactComponent} from '../../pages/factory/factory-contact/factory-contact.component';
import {OptionsService} from '../../forms/_service/options.service';
import {PostService} from '../../_services/post.service';
;
@Component({
  selector: 'app-core-dash-board-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [OptionsService, PostService]
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  private options: any;

  cards = false;

  constructor( private post: PostService, private breakpointObserver: BreakpointObserver, private optService: OptionsService) {}


}
