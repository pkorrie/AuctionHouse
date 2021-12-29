package com.spacecats.AuctionHouse.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="bids")
@Data
public class Bid {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private int amount;
	private int bidderid;
	private int artid;
}
