import { DrivesDetailsPage } from './../../pages/drives-details/drives-details.page';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-drives-card',
  templateUrl: './drives-card.component.html',
  styleUrls: ['./drives-card.component.scss'],
})
export class DrivesCardComponent implements OnInit {
  public drive: any;
  public formattedTime: any;

  @Input() set data(value: any) {
    this.drive = value;
    this.drive.startDate = moment(this.drive.startDate.toDate());
    this.formattedTime = this.drive.startDate.fromNow();
  }

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.drive);
  }

  async openDetails() {
    const modal = await this.modalController.create({
      component: DrivesDetailsPage,
      componentProps: {
        data: this.drive
      }
    });
    return await modal.present();
  }

}
