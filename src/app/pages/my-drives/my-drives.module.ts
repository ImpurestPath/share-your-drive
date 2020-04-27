import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDrivesPageRoutingModule } from './my-drives-routing.module';

import { MyDrivesPage } from './my-drives.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDrivesPageRoutingModule
  ],
  declarations: [MyDrivesPage]
})
export class MyDrivesPageModule {}
