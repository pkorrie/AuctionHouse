import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private us: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.us.logout();
    this.router.navigate(['']);
  }
}
