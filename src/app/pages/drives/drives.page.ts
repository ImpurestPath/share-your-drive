import { Component, OnInit } from '@angular/core';
import { DriveService } from 'src/app/service/drive.service';

@Component({
  selector: 'app-drives',
  templateUrl: './drives.page.html',
  styleUrls: ['./drives.page.scss'],
})
export class DrivesPage implements OnInit {
  private filters = {
    filterNear: 'Kyydit lähellä sinua',
    filterNew: 'Uusimmat kyydit',
    filterFavorites: 'Suosikit'
  }
  currentFilter: any;
  drives: Array<any>;

  constructor(private driveService: DriveService) { }

  ngOnInit() {
    this.currentFilter = this.filters.filterNear;
    this.driveService.getRecent(10).subscribe(drives => {
      this.drives = drives
      console.log(this.drives);
    });
  }

  activateFilter(filter: string) {
    switch (filter) {
      case 'near':
        this.currentFilter = this.filters.filterNear;
        break;
      case 'new':
        this.currentFilter = this.filters.filterNew;
        break;
      case 'favorites':
        this.currentFilter = this.filters.filterFavorites;
        break;
    }
  }

}
