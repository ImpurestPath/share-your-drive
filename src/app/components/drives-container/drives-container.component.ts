import { Component, OnInit } from '@angular/core';
import { Drive } from '../../entity/drive';

@Component({
  selector: 'app-drives-container',
  templateUrl: './drives-container.component.html',
  styleUrls: ['./drives-container.component.scss'],
})
export class DrivesContainerComponent implements OnInit {
  public currentFilter: any = 'Kyydit lähellä sinua';
  // public drives: Array<Drive>;
  public drives: Array<any> = [
    {
      startPlace: 'Oulu',
      finishPlace: 'Tampere',
      startDate: '21. Tammikuuta 2020'
    },
    {
      startPlace: 'Oulu',
      finishPlace: 'Tampere',
      startDate: '21. Tammikuuta 2020'
    },
    {
      startPlace: 'Oulu',
      finishPlace: 'Tampere',
      startDate: '21. Tammikuuta 2020'
    },
    {
      startPlace: 'Oulu',
      finishPlace: 'Tampere',
      startDate: '21. Tammikuuta 2020'
    },
    {
      startPlace: 'Oulu',
      finishPlace: 'Tampere',
      startDate: '21. Tammikuuta 2020'
    }
  ];

  constructor() { }

  ngOnInit() { }

}
