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

    // if user submitted form, search for drives
    if (dismiss.data) {
      this.getSearchResults(dismiss.data);
    }
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

  // FILTERS AND SEARCHING
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

  getSearchResults(form) {
    const { origin, destination, date } = form;
    this.drives = null;
    this.driveService.getSearchResults(origin, destination, date).subscribe((drives) => {
      this.currentFilter = `${origin} - ${destination}`;
      this.searchResults = drives;
      this.drives = this.searchResults;
    });
  }
}
