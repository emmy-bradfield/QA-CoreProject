	package com.qa.main.unitTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import com.qa.main.domain.Guest;
import com.qa.main.repo.GuestRepo;
import com.qa.main.service.GuestService;

@SpringBootTest
public class GuestServiceUnitTest {
	
	@Autowired
	private GuestService service;
	
	@MockBean
	private GuestRepo repo;
	
	@Test
	public void create() {
		Guest create = new Guest(2L, false, "James Bradfield", "jamesbradfield270901@gmail.com", "toot", false, false, false, false);
		Guest expected = new Guest(2L, false, "James Bradfield", "jamesbradfield270901@gmail.com", "toot", false, false, false, false);
		
		Mockito.when(repo.saveAndFlush(create)).thenReturn(expected);
		
		assertEquals(expected, service.create(create));
	}
	
	@Test
	public void setupTest() throws Exception {
		Guest host = new Guest("Sue Donym", "sue-donym@gmail.com", "admin");
		Guest expect = new Guest (1L, true, "Sue Donym", "sue-donym@gmail.com", "admin", true, true, false, false);
		
		Mockito.when(repo.saveAndFlush(host)).thenReturn(expect);
		
		assertEquals(expect, service.setup(host));
	}
	
	@Test
	public void viewAll() {
		List<Guest> result = new ArrayList<>();
		result.add(new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false, false));
		
		Mockito.when(repo.findAll()).thenReturn(result);
		
		assertEquals(result, service.viewAll());
	}
	
	@Test
	public void view() {
		Long id = 1L;
		Guest guest = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false, false);
		Optional<Guest> guestOp = Optional.ofNullable(guest);
		
		Mockito.when(repo.findById(1L)).thenReturn(guestOp);
		
		assertEquals(guest, service.view(id));
	}
	
	@Test
	public void viewEmail() {
		String email = "emily-bradfield@outlook.com";
		Guest guest = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false, false);
		Optional<Guest> guestOp = Optional.ofNullable(guest);
		
		Mockito.when(repo.findByEmail(email)).thenReturn(guestOp);
		
		assertEquals(guest, service.viewEmail(email));
	}
	
	@Test
	public void update() {
		Long id = 1L;
		Guest update = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root2", true, true, false, false);
		Optional<Guest> updateOp = Optional.ofNullable(update);
		
		Guest expected = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root2", true, true, false, false);
		
		
		Mockito.when(repo.findById(id)).thenReturn(updateOp);
		Mockito.when(repo.saveAndFlush(update)).thenReturn(expected);
		
		assertEquals(expected, service.update(id, update));
	}
	
	@Test
	public void respondTest() throws Exception {
		Long id = 1L;
		Guest respond = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, true,
				false);
		Optional<Guest> respondOp = Optional.ofNullable(respond);

		Guest expected = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, true,
				false);

		
		Mockito.when(repo.findById(id)).thenReturn(respondOp);
		Mockito.when(repo.saveAndFlush(respond)).thenReturn(expected);
		
		assertEquals(expected, service.update(id, respond));
	}
	
	@Test
	public void activateTest() throws Exception {
		Long id = 2L;
		Guest inactive = new Guest("James Bradfield", "jamesbradfield270901@gmail.com");	
		Optional<Guest> inactiveOp = Optional.ofNullable(inactive);
		Guest active = new Guest (2L, false, "James Bradfield", "jamesbradfield270901@gmail.com", "rootin-tootin", true, false, false, false);
		
		Mockito.when(repo.findById(id)).thenReturn(inactiveOp);
		Mockito.when(repo.saveAndFlush(inactive)).thenReturn(active);
		
		assertEquals(active, service.activate(id));
	}
	
	@Test
	public void delete() {
		Long id = 1L;
		Mockito.when(repo.existsById(1L)).thenReturn(false);
		
		assertEquals(true, service.delete(id));
	}

}