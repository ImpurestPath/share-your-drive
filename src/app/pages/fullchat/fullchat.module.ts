import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullchatPageRoutingModule } from './fullchat-routing.module';

import { FullchatPage } from './fullchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullchatPageRoutingModule
  ],
  declarations: [FullchatPage]
})
export class FullchatPageModule {}
