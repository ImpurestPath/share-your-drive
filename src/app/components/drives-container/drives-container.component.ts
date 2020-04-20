import { Component, OnInit, Input } from '@angular/core';
import { Drive } from 'src/app/entity/drive';
import { PopoverController } from '@ionic/angular';
import { AddFavoritePopupComponent } from '../add-favorite-popup/add-favorite-popup.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-drives-container',
  templateUrl: './drives-container.component.html',
  styleUrls: ['./drives-container.component.scss'],
})
export class DrivesContainerComponent implements OnInit {
  @Input() currentFilter: string;
  @Input() drives: Array<Drive>;

  user: any;
  color: string;

  constructor(private popoverController: PopoverController, private userService: UserService) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddFavoritePopupComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    let dismiss = await popover.onDidDismiss();

    // if the user adds a new favorite
    if (dismiss.data) {
      this.userService.addFavorite(this.user.uid, dismiss.data.origin, dismiss.data.destination);
    }
  }

  ngOnInit() {
    this.userService.userDataSubject.subscribe((data) => {
      this.user = data;
    })
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
