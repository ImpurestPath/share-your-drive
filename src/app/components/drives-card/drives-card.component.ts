import { Component, OnInit, Input } from '@angular/core';
import { Drive } from '../../entity/drive';

@Component({
  selector: 'app-drives-card',
  templateUrl: './drives-card.component.html',
  styleUrls: ['./drives-card.component.scss'],
})
export class DrivesCardComponent implements OnInit {
  @Input() drive: any;

  constructor() { }

  ngOnInit() { }

  openDetails() {
    // CODE TO OPEN DETAIL PAGES
  }

}
