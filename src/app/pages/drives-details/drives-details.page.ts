import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-drives-details',
  templateUrl: './drives-details.page.html',
  styleUrls: ['./drives-details.page.scss'],
})
export class DrivesDetailsPage implements OnInit {

  @Input() drive: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
