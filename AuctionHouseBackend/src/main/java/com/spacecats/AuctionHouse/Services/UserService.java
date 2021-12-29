package com.spacecats.AuctionHouse.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.spacecats.AuctionHouse.Daos.UserRepository;
import com.spacecats.AuctionHouse.Exceptions.UNFException;
import com.spacecats.AuctionHouse.Models.User;

@Service
public class UserService {
	
	private UserRepository ur;
	
	@Autowired
	public UserService(UserRepository ur) {
		this.ur = ur;
	}

	public List<User> getAllUsers(){
		List<User> users = ur.findAll();
		users.forEach(u -> u.setPw(null));
		return users;
	}
	
	public User getUserById(int id) {
		User u = ur.findById(id).orElseThrow(UNFException::new);
		u.setPw(null);
		return u;
	}
	
	public User login(User u1) {
		User u2 = ur.findByUname(u1.getUname());
		if(u1.getPw().equals(u2.getPw())) {
			u2.setPw(null);
			return u2;
		}
		return null;
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public String createUser(User u) {
		u.setRoleid(2);
		User result = ur.save(u);
		int id = result.getId();
		int roleid = result.getRoleid();
		return id + ":" + roleid;
	}
	
	public List<User> getUserByRoleid(int roleid){
		return ur.findUsersByRoleid(roleid);
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public User update(User u1, int id) {
		User u2 = ur.getById(id);
		u2.setFname(u1.getFname());
		u2.setLname(u1.getLname());
		u2.setUname(u1.getUname());
		u2.setPw(u1.getPw());
		return ur.save(u2);
	}
}