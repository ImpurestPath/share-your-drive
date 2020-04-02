import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivesPageRoutingModule } from './drives-routing.module';

import { DrivesPage } from './drives.page';

import { DrivesContainerComponent } from '../../components/drives-container/drives-container.component';
import { DrivesCardsComponent } from '../../components/drives-cards/drives-cards.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivesPageRoutingModule
  ],
  declarations: [DrivesPage, DrivesContainerComponent, DrivesCardsComponent],
  exports: [DrivesCardsComponent]
})
export class DrivesPageModule { }
