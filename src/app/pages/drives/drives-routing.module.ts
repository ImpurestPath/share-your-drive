import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrivesPage } from './drives.page';

const routes: Routes = [
  {
    path: '',
    component: DrivesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrivesPageRoutingModule {}
