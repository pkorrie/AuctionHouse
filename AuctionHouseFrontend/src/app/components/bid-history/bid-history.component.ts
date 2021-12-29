import { Component, Input, OnInit } from '@angular/core';
import { Bid } from 'src/app/model/Bid';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {
  @Input() bids: Bid[] = [];
  @Input() artId: any;
  constructor() { }

  ngOnInit(): void {
  }

}
