import { Component, OnInit, Input } from '@angular/core';
import { Drive } from 'src/app/entity/drive';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-drives-container',
  templateUrl: './drives-container.component.html',
  styleUrls: ['./drives-container.component.scss'],
})
export class DrivesContainerComponent implements OnInit {
  @Input() currentFilter: string;
  @Input() drives: Array<Drive>;
  plat: boolean;

  color: string;

  constructor(private platform: Platform) { }

  ngOnInit() {
    this.plat = this.platform.is('desktop') ? true : false;
  }

  getColor(index: number) {
    if (index === 0 || index === 4 || index === 8) {
      return 'primary';
    } else if (index === 1 || index === 5 || index === 9) {
      return 'secondary';
    } else if (index === 2 || index === 6 || index === 10) {
      return 'tertiary';
    } else if (index === 3 || index === 7 || index === 11) {
      return 'medium';
    }
  }

}
