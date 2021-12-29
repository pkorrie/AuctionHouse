package com.spacecats.AuctionHouse.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.spacecats.AuctionHouse.Daos.ArtRepository;
import com.spacecats.AuctionHouse.Exceptions.UNFException;
import com.spacecats.AuctionHouse.Models.Art;

@Service
public class ArtService {
	
	private ArtRepository ar;
	
	@Autowired
	public ArtService(ArtRepository ar) {
		this.ar = ar;
	}

	public List<Art> getAllArts(){
		return ar.findAll();
	}
	
	public Art getArtById(int id) {
		return ar.findById(id).orElseThrow(UNFException::new);
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public Art createArt(Art a) {
		return ar.save(a);
	}
	
	public List<Art> getArtByOwnerId(int ownerid){
		return ar.findArtsByOwnerid(ownerid);
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public Art update(Art a1, int id) {
		Art a2 = ar.getById(id);
		a2.setOwnerid(a1.getOwnerid());
		return ar.save(a2);
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public void delete(int id){
		ar.deleteById(id);
	}
}