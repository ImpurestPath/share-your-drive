import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as moment from 'moment';
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

  constructor(private router: Router) {}

  ngOnInit() {}

  getShade() {
    return `var(--ion-color-${this.color}-shade)`;
  }

  clicked() {
    this.router.navigate(['../../../tabs/tabs/drives', this.drive.id], {
      queryParams: { color: this.color },
    });
  }
}
