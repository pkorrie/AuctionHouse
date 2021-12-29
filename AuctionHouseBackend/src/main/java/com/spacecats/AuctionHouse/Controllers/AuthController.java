package com.spacecats.AuctionHouse.Controllers;

import com.spacecats.AuctionHouse.Models.User;
import com.spacecats.AuctionHouse.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(exposedHeaders = "Authorization")
public class AuthController {

	private UserService us;
	
	@Autowired
	public AuthController(UserService us) {
		this.us = us;
	}
	
	@PostMapping
	public ResponseEntity<User> login(@RequestBody User user){
		User u = us.login(user);
		if(u != null) {
			u.setPw(null);
			String token = u.getId() + ":" + u.getRoleid();
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", token);
			return new ResponseEntity<>(u, headers, HttpStatus.CREATED);
		}
		else return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}
}