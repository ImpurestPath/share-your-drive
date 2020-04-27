import { AddDrivePage } from './../../pages/add-drive/add-drive.page';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { MyDrivesPage } from './../../pages/my-drives/my-drives.page';

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
          text: 'Omat kyydit',
          icon: 'list-circle-outline',
          handler: () => {
            this.openDrivesList();
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

  async openDrivesList() {
    const modal = await this.modalController.create({
      component: MyDrivesPage
    })
    await modal.present();

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
