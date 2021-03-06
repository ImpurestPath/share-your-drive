import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'drives',
        loadChildren: () => import('../drives/drives.module').then(m => m.DrivesPageModule)
      },
      {
        path: 'drives/:driveId',
        loadChildren: () => import('../drives-details/drives-details.module').then(m => m.DrivesDetailsPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'chat/:chatId/:toId',
        loadChildren: () => import('../fullchat/fullchat.module').then(m => m.FullchatPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/drives',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
