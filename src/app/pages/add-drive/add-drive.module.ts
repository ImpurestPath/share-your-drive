import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDrivePageRoutingModule } from './add-drive-routing.module';

import { AddDrivePage } from './add-drive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDrivePageRoutingModule
  ],
  declarations: [AddDrivePage]
})
export class AddDrivePageModule {}
