import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivesDetailsPageRoutingModule } from './drives-details-routing.module';

import { DrivesDetailsPage } from './drives-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivesDetailsPageRoutingModule
  ],
  declarations: [DrivesDetailsPage]
})
export class DrivesDetailsPageModule { }
