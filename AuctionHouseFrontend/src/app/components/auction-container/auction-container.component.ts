import { Component, Input, OnInit } from '@angular/core';
import { Auction } from 'src/app/model/Auction';
import { Bid } from 'src/app/model/Bid';
import { AuctionService } from 'src/app/services/auction.service';
import { BidService } from 'src/app/services/bid.service';

@Component({
  selector: 'app-auction-container',
  templateUrl: './auction-container.component.html',
  styleUrls: ['./auction-container.component.css']
})

export class AuctionContainerComponent implements OnInit {
  @Input() auctions: Auction[] = [];
  unsavedBid: number = 0;
  constructor(private bidService: BidService, private auctionService: AuctionService) { }

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

    this.bidService.createBid(body).subscribe((res: any) => {
      this.auctions = this.auctionService.getAuctions();
    })
  }

  updateAuctions() {
    this.auctions = this.auctionService.getAuctions();
  }

  getAuctions() {
    this.auctions = this.auctionService.auctions;
  }
}
