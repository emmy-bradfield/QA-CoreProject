package com.qa.main.unitTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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
	public void viewAll() {
		List<Guest> result = new ArrayList<>();
		result.add(new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false, false));
		
		Mockito.when(repo.findAll()).thenReturn(result);
		
		assertEquals(result, service.viewAll());
	}
	
	@Test
	public void view() {
		Guest guest = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false, false);
		Optional<Guest> guestOp = Optional.ofNullable(guest);
		
		Mockito.when(repo.findById(1L)).thenReturn(guestOp);
	}
	
	@Test
	public void update() {
		Long id = 1L;
		Guest update = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root2", true, true, false, false);		
		Guest expected = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root2", true, true, false, false);
		Optional<Guest> expectedOp = Optional.ofNullable(expected);
		
		Mockito.when(repo.findById(id)).thenReturn(expectedOp);
		Mockito.when(repo.saveAndFlush(update)).thenReturn(expected);
		
		assertEquals(expected, service.update(id, update));
	}
	
	@Test
	public void delete() {
		Long id = 1L;
		Mockito.when(repo.existsById(1L)).thenReturn(false);
		
		assertEquals(true, service.delete(id));
	}

}