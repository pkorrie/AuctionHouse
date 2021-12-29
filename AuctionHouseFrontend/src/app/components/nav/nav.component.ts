import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  currentUser: any = JSON.parse(localStorage['currentUser']);
  role: number = 0;
  fname: string = '';
  lname: string = '';
  uname: string = '';
  pw: string = '';

  constructor(private us: UserService, private router: Router){
    this.refreshInfo();
  }

  ngOnInit() {
    if(this.currentUser) this.role = this.currentUser.roleid;
  }

  update() {
    let u: User = {fname: this.fname, lname: this.lname, uname: this.uname, pw: this.pw, roleid: 2}
    let data = JSON.stringify(u);
    this.us.update(data).subscribe(res =>{
      if(HttpStatusCode.Ok){
        this.refreshInfo();
        console.log("update went through");
      } else{
        console.log("not working");
      }
    })
  }

  refreshInfo() {
    let u: any = localStorage.getItem("currentUser");
    u = JSON.parse(u);
    this.fname = u.fname;
    this.lname = u.lname;
    this.uname = u.uname;
  }

  home(){
    let role = localStorage.getItem("token")?.split(":")[1];
        if(role === '1'){
          this.router.navigate(['/auctioneer'])
        } else if(role === '2'){
          this.router.navigate(['/client'])
        } else {
          this.router.navigate(['/'])
        };
  }
}
