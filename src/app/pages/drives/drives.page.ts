import { Component, OnInit } from '@angular/core';
import { DriveService } from 'src/app/service/drive.service';
import { DrivesSearchPopupComponent } from 'src/app/components/drives-search-popup/drives-search-popup.component';
import { PopoverController } from '@ionic/angular';
import { LocationService } from 'src/app/service/location.service';
import { Platform } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';

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
  favorites: Array<any>;
  private nearest: Array<any>;
  private searchResults: Array<any>;
  public location: any = null;

  public currentFilter: string;
  public drives: Array<any>;
  uid: any;
  user: any;

  constructor(private driveService: DriveService,
    public popoverController: PopoverController,
    private locationService: LocationService,
    private platform: Platform,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.userDataSubject.subscribe((user) => {
      this.uid = user.uid;
      if (this.uid) this.getUserData();
    })
    // Checks the platform, as nearest
    // drives filter only works on mobile.
    if (this.platform.is('mobile') || this.platform.is('android') || this.platform.is('cordova')) {
      this.currentFilter = this.filters.filterNear;
      this.locationService.getLocation().then((res) => {
        this.location = res[0].locality;
        this.getNearest(this.location);
      });

      // Chooses newest as the default filter if on browser
    } else {
      this.currentFilter = this.filters.filterNew;
      this.getNewest();
    }
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
    // and store current searchRoute in a variable
    if (dismiss.data) this.searchDrives(dismiss.data);
  }

  activateFilter(filter: string) {
    switch (filter) {
      case 'near':
        this.drives = null;
        this.currentFilter = this.filters.filterNear;
        (this.nearest)
          ? this.drives = this.nearest
          : this.getNearest(this.location);
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
        this.getFavorites();
        break;
    }
  }

  createdEvent(event: boolean) {
    if (event) this.activateFilter('new');
  }

  // FILTERS AND SEARCHING
  getNewest() {
    this.driveService.getRecent(10).subscribe(drives => {
      this.newest = drives;
      this.drives = this.newest;
    });
  }

  getUserData() {
    this.userService.getUserData(this.uid).subscribe((doc) => {
      console.log(doc);
      this.user = doc;
      if (this.currentFilter == 'Suosikit') this.getFavorites();
    })
  }

  getFavorites() {
    this.favorites = [];
    this.user.favorites.forEach((favorite) => {
      this.driveService.getFavorites(favorite).subscribe((drive) => {
        this.favorites = this.favorites.concat(drive);
        this.drives = this.favorites;
      });
    })
  }

  getNearest(location: string) {
    this.driveService.getNearest(location).subscribe(drives => {
      this.nearest = drives;
      this.drives = this.nearest;
    });
  }

  searchDrives(form) {
    const { origin, destination, date } = form;
    this.drives = null;
    this.driveService.getSearchResults(origin, destination, date).subscribe((drives) => {
      this.currentFilter = `${origin} - ${destination}`;
      this.searchResults = drives;
      this.drives = this.searchResults;
    });
  }
}
