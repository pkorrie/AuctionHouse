import { Injectable } from '@angular/core';
import { Art } from '../model/Art';
import { Auction } from '../model/Auction';
import { Bid } from '../model/Bid';
import { ArtService } from './art.service';
import { BidService } from './bid.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  ids: number[] = [];
  auctions: Auction[] = [];
  artFromMetAPI: any = {};

  constructor(private as: ArtService, private bs: BidService, private es: EventService) {
    this.getAuctions();
    this.getArtIds();
    this.listenForNewBids();
    this.listenForNewArt();
    this.listenForAcceptingBids();
    this.listenForRemovingArt();
  }

  getAuctions() {
    let arts: Art[], bids: Bid[], highestBid: number;
    this.as.getSavedArt().subscribe((res1: any) => {
      arts = this.as.arts.filter((art: { ownerid: number; }) => art.ownerid === 1);
      this.bs.getAllBids().subscribe((res2: any) => {
        bids = this.bs.bids;
        let result: Auction[] = [];
        for (const art of arts) {
          let bidsOfArt: Bid[] = bids.filter(bid => bid.artid === art.id);
          highestBid = bidsOfArt.length <= 0 ? 0 : this.getHighestBid(bidsOfArt);
          let auction: Auction = {art, bids: bidsOfArt, highestBid};
          result.push(auction);
        }
        this.auctions = result;
      })
    })
    return this.auctions;
  }

  getArtIds() {
    this.as.getArtIdsWithImages().subscribe((res: any) => {
      this.ids = this.as.ids;
    });
  }

  getRandomArtFromMetroAPI(){
    let ids = this.ids;
    let randomArtPieceId: number;
    if(ids.length <= 0) return;
    randomArtPieceId = ids[Math.floor(Math.random() * ids.length)];
    return this.as.getArtById(randomArtPieceId);
  }

  getHighestBid(arrayOfBids: Bid[]) {
    return arrayOfBids.reduce((max, current) => {
      if(current.amount > max) max = current.amount;
      return max;
    }, 0)
  }

  listenForNewBids() {
    this.es.newBidEvent$.subscribe((res: Bid) => {      
      console.log(this.auctions[0].bids.length)
      console.log(this.auctions[0].highestBid)
      for(let auction of this.auctions){
        if(res.artid === auction.art.id){
          let i = this.auctions.indexOf(auction)
          this.auctions[i].bids.push(res);          
          this.auctions[i].highestBid = this.getHighestBid(this.auctions[i].bids)
        }
      }
      console.log(this.auctions[0].bids.length)
      console.log(this.auctions[0].highestBid)

    });
  }

  listenForNewArt() {
    this.es.newArtEvent$.subscribe((art: Art) => {
      let auction = {
        art,
        bids: [],
        highestBid: 0
      }
      this.auctions.push(auction);
    });
  }

  listenForAcceptingBids() {
    this.es.acceptBidEvent$.subscribe((res: Art) => {
      for(let auction of this.auctions){
        if(res.id === auction.art.id){
          this.auctions.splice(this.auctions.indexOf(auction), 1)
        }
      }
    });
  }

  listenForRemovingArt() {
    this.es.removeArtEvent$.subscribe((id: number) => {
      for(let auction of this.auctions){
        if(id === auction.art.id){
          this.auctions.splice(this.auctions.indexOf(auction), 1)
        }
      }
    });
  }
}
