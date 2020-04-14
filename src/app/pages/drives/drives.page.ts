import { Component, OnInit } from '@angular/core';
import { DriveService } from 'src/app/service/drive.service';
import { DrivesSearchPopupComponent } from 'src/app/components/drives-search-popup/drives-search-popup.component';
import { PopoverController } from '@ionic/angular';

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
  currentFilter: string;
  drives: Array<any>;
  search: any;

  constructor(private driveService: DriveService, public popoverController: PopoverController) { }

  ngOnInit() {
    this.currentFilter = this.filters.filterNear;
    this.driveService.getRecent(10).subscribe(drives => {
      this.drives = drives;
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DrivesSearchPopupComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    let dismiss = await popover.onDidDismiss();
    if (dismiss.data) {
      this.search = dismiss.data;
      this.searchDrive(this.search);
    }
  }

  searchDrive(data) {
    console.log(data);
    this.currentFilter = `${data.origin} - ${data.destination}`;
  }

  activateFilter(filter: string) {
    switch (filter) {
      case 'near':
        this.currentFilter = this.filters.filterNear;
        // TODO this.filterNear()
        break;
      case 'new':
        this.currentFilter = this.filters.filterNew;
        // TODO this.filterNew()
        break;
      case 'favorites':
        this.currentFilter = this.filters.filterFavorites;
        // TODO this.filterFavorites()
        break;
    }
  }

  // TODO FILTERS
  filterNear() {

  }

  filterNew() {

  }

  filterFavorites() {

  }

}
