import { AddDrivePage } from './../../pages/add-drive/add-drive.page';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-drives-action',
  templateUrl: './drives-action.component.html',
  styleUrls: ['./drives-action.component.scss'],
})
export class DrivesActionComponent {
  @Output() createdEvent = new EventEmitter();
  created: boolean;

  constructor(public actionSheetController: ActionSheetController, public modalController: ModalController) { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Kyydit',
      buttons: [
        {
          text: 'Luo uusi kyyti',
          icon: 'add',
          handler: () => {
            this.openAddPage();
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
    await actionSheet.present()

  }

  async openAddPage() {
    const modal = await this.modalController.create({
      component: AddDrivePage
    });
    await modal.present();
    let test = await modal.onDidDismiss();
    if (test.data) {
      this.created = true;
      this.createdEvent.emit(this.created);
    } else {
      this.created = false;
      this.createdEvent.emit(this.created);
    }
  }

}
