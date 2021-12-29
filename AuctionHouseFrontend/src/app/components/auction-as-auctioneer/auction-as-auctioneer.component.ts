import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auction } from 'src/app/model/Auction';
import { ArtService } from 'src/app/services/art.service';
import { EventService } from 'src/app/services/event.service';
import { Art } from '../../model/Art';
@Component({
  selector: 'app-auction-as-auctioneer',
  templateUrl: './auction-as-auctioneer.component.html',
  styleUrls: ['./auction-as-auctioneer.component.css']
})
export class AuctionAsAuctioneerComponent implements OnInit {
  @Input() auction!: Auction;

  constructor(private as: ArtService, private es: EventService) { }

  ngOnInit(): void {
  }

  sellForHighestBid() {
    let {bids, highestBid, art} = this.auction;
    if(bids.length === 0) return;
    let highestBidderId = 1;
    for (let i = 0; i < bids.length; i++) {
      const amount = bids[i].amount;
      if(amount === highestBid) highestBidderId = bids[i].bidderid;
    }
    let updatedArt: Art = {
      id: art.id,
      artist: art.artist,
      name: art.name,
      ownerid: highestBidderId,
      url: art.url
    }
    this.as.updateArtOwner(updatedArt).subscribe((res: Art) => {
      this.es.acceptBidEvent$.emit(res);
    })
  }

  cancelListing() {
    let id = this.auction.art.id;
    if(!id) return;
    this.as.deleteArt(id).subscribe((res: any) => {
      this.es.removeArt(res);
    })
  }

}
