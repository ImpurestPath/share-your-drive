import { DrivesDetailsPage } from './../../pages/drives-details/drives-details.page';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  @Input() color: string;

  constructor(
    // public modalController: ModalController,
  ) {}

  ngOnInit() {}

  getShade() {
    return `var(--ion-color-${this.color}-shade)`;
  }

  // async openDetails() {
  //   // const modal = await this.modalController.create({
  //   //   component: DrivesDetailsPage,
  //   //   componentProps: {
  //   //     data: this.drive
  //   //   }
  //   // });
  //   // return await modal.present();
  // }
}
