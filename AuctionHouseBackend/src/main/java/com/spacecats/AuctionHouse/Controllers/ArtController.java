package com.spacecats.AuctionHouse.Controllers;

import java.util.List;

import javax.validation.Valid;

import com.spacecats.AuctionHouse.Models.Art;
import com.spacecats.AuctionHouse.Services.ArtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/arts")
@CrossOrigin("*")
public class ArtController {

	private ArtService as;
	
	@Autowired
	public ArtController(ArtService as) {
		this.as = as;
	}

	@GetMapping
	public List<Art> get(@RequestParam(name = "ownerId", required = false) Integer ownerId) {
		if (ownerId != null) {
			return as.getArtByOwnerId(ownerId);
		}
		return as.getAllArts();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Art> updateArt(@PathVariable("id")int id, @Valid @RequestBody Art art){
		Art a = as.update(art, id);
		return new ResponseEntity<>(a, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Art> create(@Valid @RequestBody Art a){
		return new ResponseEntity<>(as.createArt(a), HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Integer> delete(@PathVariable("id")int id){
		as.delete(id);
		return new ResponseEntity<>(id, HttpStatus.OK);
	}
}