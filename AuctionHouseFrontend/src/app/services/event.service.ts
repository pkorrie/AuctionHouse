import { EventEmitter, Injectable, Output } from '@angular/core';
import { Art } from '../model/Art';
import { Bid } from '../model/Bid';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    @Output() newBidEvent$: EventEmitter<Bid> = new EventEmitter();
    @Output() acceptBidEvent$: EventEmitter<Art> = new EventEmitter();
    @Output() newArtEvent$: EventEmitter<Art> = new EventEmitter();
    @Output() removeArtEvent$: EventEmitter<number> = new EventEmitter();

    newBid(body: Bid) {
        this.newBidEvent$.emit(body);
    }

    newArt(body: Art) {
        this.newArtEvent$.emit(body);
    }

    acceptBid(body: Art) {
        this.acceptBidEvent$.emit(body);
    }

    removeArt(id: number){
        this.removeArtEvent$.emit(id);
    }
}