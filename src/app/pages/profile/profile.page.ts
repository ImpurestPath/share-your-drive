import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  photo:any;
  user:any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.userDataSubject.value;
    this.photo = this.userService.userDataSubject.value;

  }


  signOut() {
    this.userService.signOut().then(() => {
      this.router.navigateByUrl('');
    });

    // window.location.reload();
>>>>>>> 78a095653d5d2ef936e8bbddc118ab484af2b153
  }
}
