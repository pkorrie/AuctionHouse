import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs';
import { Bid } from '../model/Bid';

@Injectable({
  providedIn: 'root'
})

export class BidService {
  bids: Bid[] = [];
  constructor(private http: HttpClient) { }

  getAllBids() {
    let url = `${environment.API_URL}/bids`;
    return this.http.get(url).pipe(map((response: any) => {
      this.bids = response;
    }));
  }

  getBidsByBidderId(bidderId: number) {
    let url = `${environment.API_URL}/bids/?bidderId=${bidderId}`;
    return this.http.get(url).pipe(map((response: any) => {
      this.bids = response;
      return response;
    }));
  }

  getBidsByArtId(artId: number) {
    let userId = localStorage.getItem("token")?.split(":")[0];
    let url = `${environment.API_URL}/bids/${userId}/art/${artId}`;
    return this.http.get(url).pipe(map((response: any) => {
      this.bids = response;
    }));
  }

  createBid(body: Bid) {
    let url = `${environment.API_URL}/bids/`;
    return this.http.post(url, body).pipe(map((response: any) => {
      return response;
    }));
  }
}
