import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDrivesPage } from './my-drives.page';

const routes: Routes = [
  {
    path: '',
    component: MyDrivesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDrivesPageRoutingModule {}
