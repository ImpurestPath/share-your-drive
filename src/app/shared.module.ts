import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DrivesActionComponent } from 'src/app/components/drives-action/drives-action.component';
import { IonicModule } from '@ionic/angular';
import { AddDrivePageModule } from 'src/app/pages/add-drive/add-drive.module';
import { Component } from '@angular/core';
import { MyDrivesPageModule } from './pages/my-drives/my-drives.module';


@NgModule({
    imports: [CommonModule, AddDrivePageModule, IonicModule, MyDrivesPageModule],
    declarations: [DrivesActionComponent],
    exports: [DrivesActionComponent, AddDrivePageModule, CommonModule, IonicModule, FormsModule]
})
export class SharedModule { }