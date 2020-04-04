import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivesPageRoutingModule } from './drives-routing.module';

import { DrivesPage } from './drives.page';

import { DrivesContainerComponent } from '../../components/drives-container/drives-container.component';
import { DrivesCardComponent } from '../../components/drives-card/drives-card.component';
import { DrivesActionComponent } from '../../components/drives-action/drives-action.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivesPageRoutingModule
  ],
  declarations: [
    DrivesPage,
    DrivesContainerComponent,
    DrivesCardComponent,
    DrivesActionComponent
  ],
  exports: [DrivesCardComponent]
})
export class DrivesPageModule { }
