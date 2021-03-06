import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { RouterModule } from '@angular/router';

import { CalendarPage } from './calendar.page';

import { SharedModule } from 'src/app/shared.module';

// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';

import { DrivesDetailsPageModule } from './../drives-details/drives-details.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    DrivesDetailsPageModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarPage
      }
    ]),
    CalendarModule
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule { }
