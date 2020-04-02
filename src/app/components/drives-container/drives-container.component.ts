import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drives-container',
  templateUrl: './drives-container.component.html',
  styleUrls: ['./drives-container.component.scss'],
})
export class DrivesContainerComponent implements OnInit {
  public currentFilter: any = 'Kyydit lähellä sinua';
  public cards: Array<any> = [
    { route: 'Oulu - Tampere', time: 'now' },
    { route: 'Helsinki - Lappeenranta', time: 'tomorrow' }
  ];

  constructor() { }

  ngOnInit() { }

}
