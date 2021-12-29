import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uname = "";
  pw = "";

  constructor(private us: UserService, private router: Router) {}

  ngOnInit(): void {
    let role = localStorage.getItem("token")?.split(":")[1];
        if(role === '1'){
          this.router.navigate(['/auctioneer'])
        } else if(role === '2'){
          this.router.navigate(['/client'])
        } 
  }

  login(): void{
    const uname = this.uname
    const pw = this.pw
    let data: any = {uname, pw};
    data = JSON.stringify(data);
    this.us.login(data).subscribe(res =>{
      if(HttpStatusCode.Ok){
        let role = Number.parseInt(this.us.token.split(":")[1]);
        if(role === 1){
          this.router.navigate(['/auctioneer'])
        } else if(role === 2){
          this.router.navigate(['/client'])
        } else {
          this.router.navigate(['/'])
        };
      } else{
        console.log("not working");
      }
    })
  }
  
}
