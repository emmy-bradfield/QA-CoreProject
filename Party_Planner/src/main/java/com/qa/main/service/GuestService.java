package com.qa.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.qa.main.domain.Guest;
import com.qa.main.repo.GuestRepo;

@Service
public class GuestService {

	private GuestRepo repo;

	public GuestService(GuestRepo repo) {
		super();
		this.repo = repo;
	}

	public Guest create(Guest guest) {
		return this.repo.saveAndFlush(guest);
	}

	public List<Guest> viewAll() {
		return this.repo.findAll();
	} 
	
	public Guest view(Long id) {
		Optional<Guest> guestOp = this.repo.findById(id);
		Guest guest = guestOp.get();
		return guest;
	}


	public Guest update(Long id, Guest newGuest) {
		Optional<Guest> guestOp = this.repo.findById(id);
		Guest guest = guestOp.get();
		guest.setName(newGuest.getName());
		guest.setEmail(newGuest.getEmail());
		return this.repo.saveAndFlush(guest);
	}
	
	public Boolean delete(Long id) {
		this.repo.deleteById(id);
		Boolean exists = this.repo.existsById(id);
		return !exists;
	}
}