package com.qa.main.unitTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.qa.main.domain.Guest;
import com.qa.main.service.GuestService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest
public class GuestControllerUnitTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper mapper;

	@MockBean
	private GuestService service;

	@Test
	public void createTest() throws Exception {
		Guest create = new Guest(2L, false, "James Bradfield", "jamesbradfield270901@gmail.com", "toot", false, false,
				false, false); // create the java object
		String createJSON = mapper.writeValueAsString(create); // turn it into a JSON object

		// 2) Create the expected object
		Guest expected = new Guest(2L, false, "James Bradfield", "jamesbradfield270901@gmail.com", "toot", false, false,
				false, false);
		String expectedJSON = mapper.writeValueAsString(expected);

		Mockito.when(service.create(create)).thenReturn(expected);

		mvc.perform(post("/create").contentType(MediaType.APPLICATION_JSON).content(createJSON))
				.andExpect(content().json(expectedJSON));
	}

	@Test
	public void viewAllTest() throws Exception {
		List<Guest> result = new ArrayList<>();
		result.add(new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false,
				false));
		String resultJSON = mapper.writeValueAsString(result);

		Mockito.when(service.viewAll()).thenReturn(result);

		mvc.perform(get("/viewAll").contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(resultJSON));
	}
	
	@Test
	public void viewTest() throws Exception {
		Guest guest = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false,
				false);
		String guestJSON = mapper.writeValueAsString(guest);
		
		Mockito.when(service.view(1L)).thenReturn(guest);
		
		mvc.perform(get("/view?id=1").contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(guestJSON));
	}
	
	@Test
	public void viewEmailTest() throws Exception {
		Guest guest = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false,
				false);
		String guestJSON = mapper.writeValueAsString(guest);
		
		Mockito.when(service.viewEmail("emily-bradfield@outlook.com")).thenReturn(guest);
		
		mvc.perform(get("/viewEmail?email=emily-bradfield@outlook.com")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(guestJSON));
	}
	
	@Test
	public void updateTest() throws Exception {
		Long id = 1L;
		Guest update = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root2", true, true, false, false);
		String updateJSON = mapper.writeValueAsString(update);
		
		Guest expected = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root2", true, true, false, false);
		String expectedJSON = mapper.writeValueAsString(expected);
		
		Mockito.when(service.update(id, update)).thenReturn(expected);
		
		mvc.perform(put("/update?id=1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(updateJSON))
				.andExpect(content().json(expectedJSON));
	}
	
	@Test
	public void deleteTest() throws Exception {
		Mockito.when(service.delete(1L)).thenReturn(true);
		mvc.perform(delete("/delete?id=1"))
		.andExpect(status().isOk());
	}
}