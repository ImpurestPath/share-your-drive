import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drives-container',
  templateUrl: './drives-container.component.html',
  styleUrls: ['./drives-container.component.scss'],
})
export class DrivesContainerComponent implements OnInit {
  public currentFilter: any = 'Kyydit lähellä sinua';
  public cards: Array<any> = [
    { route: 'Oulu - Tampere', time: 'Sunnuntai, 21. Tammikuuta', seats: '2/4' },
    { route: 'Helsinki - Lappeenranta', time: 'Tiistai, 15. Joulukuuta', seats: '3/4' },
    { route: 'Helsinki - Lappeenranta', time: 'Tiistai, 15. Joulukuuta', seats: '3/4' }
  ];

  constructor() { }

  ngOnInit() { }

}
