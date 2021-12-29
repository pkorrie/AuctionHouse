import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {fname: '', lname: '', uname: '', pw: ''}

  constructor(private us: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.us.create(this.user).subscribe((res: any) => {
      let roleidstring: string = this.us.token.split(":")[1];
      if(!roleidstring) {
        console.log('no role id');
        return;
      }
      let roleidnumber: number = +roleidstring;
      if(roleidnumber === 2) {
        this.router.navigate(['/client'])
      } else if(roleidnumber === 1) {
        this.router.navigate(['/auctioneer'])
      } else {
        console.log('register failed');
      }
    })
  }

}
