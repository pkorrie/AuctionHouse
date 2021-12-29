import { Art } from "./Art";
import { Bid } from "./Bid";

export interface Auction {
    id?: number,
    bids: Bid[],
    highestBid: number,
    art: Art
}