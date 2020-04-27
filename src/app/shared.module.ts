import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DrivesActionComponent } from 'src/app/components/drives-action/drives-action.component';
import { IonicModule } from '@ionic/angular';
import { AddDrivePageModule } from 'src/app/pages/add-drive/add-drive.module';
import { Component } from '@angular/core';

@NgModule({
 imports:      [ CommonModule,AddDrivePageModule,IonicModule],
 declarations: [ DrivesActionComponent ],
 exports:      [ DrivesActionComponent,AddDrivePageModule,CommonModule,IonicModule,FormsModule ]
})
export class SharedModule { }