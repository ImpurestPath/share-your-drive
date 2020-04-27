import { AddDrivePageModule } from './../add-drive/add-drive.module'
import { DrivesDetailsPageModule } from './../drives-details/drives-details.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { DrivesPageRoutingModule } from './drives-routing.module'

import { DrivesPage } from './drives.page'

import { DrivesContainerComponent } from '../../components/drives-container/drives-container.component'
import { DrivesCardComponent } from '../../components/drives-card/drives-card.component'
import { DrivesActionComponent } from '../../components/drives-action/drives-action.component'
import { DrivesSearchPopupComponent } from 'src/app/components/drives-search-popup/drives-search-popup.component'
import { MyDrivesPage } from '../my-drives/my-drives.page'
import { MyDrivesPageModule } from '../my-drives/my-drives.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivesPageRoutingModule,
    DrivesDetailsPageModule,
    AddDrivePageModule,
    MyDrivesPageModule
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
