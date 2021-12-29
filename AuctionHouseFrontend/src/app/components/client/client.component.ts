import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Art } from 'src/app/model/Art';
import { Auction } from 'src/app/model/Auction';
import { Bid } from 'src/app/model/Bid';
import { AuctionService } from 'src/app/services/auction.service';
import { BidService } from 'src/app/services/bid.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  auctions: Auction[] = [];
  unsavedBid: number = 0;
  constructor(private es: EventService, private auctionService: AuctionService, private bidService: BidService) { }

  ngOnInit(): void {
    this.auctions = this.auctionService.getAuctions();
    this.es.acceptBidEvent$.subscribe((res: Bid) => {
      this.auctions = this.auctionService.auctions;
    });
    this.es.newBidEvent$.subscribe((res: Bid) => {
      this.auctions = this.auctionService.auctions;
    });
    this.es.newArtEvent$.subscribe((art: Art) => {
      this.auctions = this.auctionService.auctions;
    });
    this.es.removeArtEvent$.subscribe((id: number) => {
      this.auctions = this.auctionService.auctions;
    });
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

    this.bidService.createBid(body).subscribe((res: any) => {
      console.log(res);
      
      this.es.newBid(res);
    })
  }

  getAuctions() {
    this.auctions = this.auctionService.auctions;
  }
}
