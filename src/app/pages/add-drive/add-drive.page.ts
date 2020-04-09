import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-drive',
  templateUrl: './add-drive.page.html',
  styleUrls: ['./add-drive.page.scss'],
})
export class AddDrivePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
