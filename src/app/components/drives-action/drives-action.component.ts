import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-drives-action',
  templateUrl: './drives-action.component.html',
  styleUrls: ['./drives-action.component.scss'],
})
export class DrivesActionComponent {

  constructor(public actionSheetController: ActionSheetController) { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Kyydit',
      buttons: [
        {
          text: 'Lisää uusi kyyti',
          icon: 'add',
          handler: () => {
            console.log('Add clicked');
          }
        },
        {
          text: 'Poista kyyti',
          icon: 'trash',
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Peruuta',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

}
