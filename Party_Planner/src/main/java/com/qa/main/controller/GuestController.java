package com.qa.main.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.qa.main.domain.Guest;
import com.qa.main.service.GuestService;

@RestController
@CrossOrigin
public class GuestController {
	
	private GuestService service;
	
	public GuestController(GuestService service) {
		super();
		this.service=service;
	}

	@PostMapping("/create")
	public Guest create(@RequestBody Guest guest){
		return service.create(guest);
	}
	
	@GetMapping("/viewAll")
	public List<Guest> viewAll(){
		return this.service.viewAll();
	}
	
	@PutMapping("/update")
	public Guest update(@PathParam("id") Long id, @RequestBody Guest guest) {
		return service.update(id, guest);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<Boolean> delete(@PathParam("id")Long id){
		return new ResponseEntity<Boolean>(service.delete(id), HttpStatus.OK);
	}
	
}