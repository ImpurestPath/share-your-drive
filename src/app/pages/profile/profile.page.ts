import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  user:any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.userDataSubject.value;
  }


  signOut(){
    this.userService.signOut()
    // this.router.navigateByUrl('login');
    window.location.reload();
  }
}
