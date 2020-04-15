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
  private newest: Array<any>;
  private favorites: Array<any>;
  private nearest: Array<any>;
  private searchResults: Array<any>;

  public currentFilter: string;
  public drives: Array<any>;
  public state: boolean = false;

  constructor(private driveService: DriveService,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.currentFilter = this.filters.filterNew;
    this.getNewest();
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
      this.searchDrive(dismiss.data);
    }
  }

  searchDrive(data) {
    this.currentFilter = `${data.origin} - ${data.destination}`;
    this.getSearchResults(data.origin, data.destination);
  }

  activateFilter(filter: string) {
    switch (filter) {
      case 'near':
        this.drives = null;
        this.currentFilter = this.filters.filterNear;
        (this.nearest)
          ? this.drives = this.nearest
          : this.getNearest();
        break;
      case 'new':
        this.drives = null;
        this.currentFilter = this.filters.filterNew;
        (this.newest)
          ? this.drives = this.newest
          : this.getNewest();
        break;
      case 'favorites':
        this.drives = null;
        this.currentFilter = this.filters.filterFavorites;
        (this.favorites)
          ? this.drives = this.favorites
          : this.getFavorites();
        break;
    }
  }

  createdEvent(event: boolean) {
    if (event) {
      this.activateFilter('new');
    }
  }

  // TODO FILTERS
  getNewest() {
    this.driveService.getRecent(10).subscribe(drives => {
      this.newest = drives;
      this.drives = this.newest;
    });
  }

  getFavorites() {
    // TODO
    console.log('get favorites');
  }

  getNearest() {
    // TODO
    console.log('get nearest');
  }

  getSearchResults(origin, destination) {
    this.driveService.getSearchResults(origin, destination).subscribe((drives) => {
      this.searchResults = drives;
      this.drives = this.searchResults;
      console.log(drives);
      (drives.length < 1)
        ? this.state = true
        : this.state = false;
    });
  }
}
