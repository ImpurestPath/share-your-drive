import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullchatPage } from './fullchat.page';

const routes: Routes = [
  {
    path: '',
    component: FullchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullchatPageRoutingModule {}
