package com.spacecats.AuctionHouse.Controllers;

import java.util.List;

import javax.validation.Valid;

import com.spacecats.AuctionHouse.Models.Bid;
import com.spacecats.AuctionHouse.Services.BidService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bids")
@CrossOrigin("*")
public class BidController {

	private BidService bs;

	@Autowired
	public BidController(BidService bs) {
		this.bs = bs;
	}

	@GetMapping
	public List<Bid> get(@RequestParam(name = "bidderId", required = false) Integer bidderId) {
		if (bidderId != null) {
			return bs.getBidsByBidderid(bidderId);
		}
		return bs.getAllBids();
	}

	@PostMapping
	public ResponseEntity<Bid> create(@Valid @RequestBody Bid b) {
		return new ResponseEntity<>(bs.createBid(b), HttpStatus.CREATED);
	}
}