import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrivesDetailsPage } from './drives-details.page';

const routes: Routes = [
  {
    path: '',
    component: DrivesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrivesDetailsPageRoutingModule { }
