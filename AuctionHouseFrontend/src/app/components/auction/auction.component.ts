import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auction } from 'src/app/model/Auction';
import { Bid } from 'src/app/model/Bid';
import { BidService } from 'src/app/services/bid.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})

export class AuctionComponent implements OnInit {
  @Input() auction!: Auction;
  unsavedBid: number = 0;
  constructor(private bidService: BidService, private es: EventService) { }

  ngOnInit(): void {
  }

  placeBid(artId: number) {
    let token = localStorage.getItem("token");
    if(!token) return;
    let userId = Number.parseInt(token.split(":")[0]);

    let 
      amount: number = this.unsavedBid, 
      artid: number = artId, 
      bidderid: number = userId

    let body: Bid = {
      amount, artid, bidderid
    };

    this.bidService.createBid(body).subscribe((res: Bid) => {
      this.es.newBid(res);
    })
  }

  getAuction() {
    console.log(this.auction.art.id);
  }
}
