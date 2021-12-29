import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;
  token: string = "";

  constructor(private http: HttpClient) { }

  update(data: string){
    let id = localStorage.getItem("token")?.split(":")[0];
    return this.http.put(`${environment.API_URL}/users/${id}`, data, {
      headers: {'Content-type': 'application/json'},
      observe: 'response'
    }).pipe(
      map(response => {
        let res = JSON.stringify(response.body);
        this.currentUser = res;
        localStorage.setItem("currentUser", this.currentUser);
      })
    );
  }

  create(data: any) {
    return this.http.post(`${environment.API_URL}/users`, data, {
      headers: {'Content-type': 'application/json'},
      observe: 'response'
    }).pipe(
      map(response => {
        this.currentUser = response.body;
        let {id, roleid} = this.currentUser;
        let token = id + ":" + roleid;
        this.token = token;
        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      })
    );
  }

  login(data: any){
    return this.http.post(`${environment.API_URL}/api/auth`, data, {
      headers: {'Content-type': 'application/json'},
      observe: 'response'
    }).pipe(
      map(response => {
        this.currentUser = response.body;
        console.log(this.currentUser);
        this.token = response.headers.get('Authorization') || '';
        localStorage.setItem("token", this.token);
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      })
    );
  }

  
  logout(): void {
    this.currentUser = undefined;
    this.token = '';
    localStorage.clear();
  }
}
