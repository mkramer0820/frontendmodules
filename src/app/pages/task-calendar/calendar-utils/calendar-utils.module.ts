import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import {SharedModule} from 'app/shared/shared.module';


@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule, SharedModule],
  declarations: [CalendarHeaderComponent],
  exports: [CalendarHeaderComponent]
})
export class CalendarUtilsModule { }
