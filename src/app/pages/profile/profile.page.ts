import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  signOut(){
    this.userService.signOut()
    this.router.navigateByUrl('/');
  }
}
