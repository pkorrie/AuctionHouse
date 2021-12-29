import { Component, OnInit } from '@angular/core';
import { Bid } from 'src/app/model/Bid';
import { BidService } from 'src/app/services/bid.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-search-bidders',
  templateUrl: './search-bidders.component.html',
  styleUrls: ['./search-bidders.component.css']
})
export class SearchBiddersComponent implements OnInit {
  bidderId: number = 0;
  bids: Bid[] = [];
  constructor(private bs: BidService, private es: EventService) { }

  ngOnInit(): void {
  }

  searchBidders(bidderId: number) {
    this.bs.getBidsByBidderId(bidderId).subscribe((res: Bid[]) => {
      console.log(res);
      this.bids = res;
      console.log(this.bids);
    })
  }
}
