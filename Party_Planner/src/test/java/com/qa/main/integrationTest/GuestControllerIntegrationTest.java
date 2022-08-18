package com.qa.main.integrationTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;

import com.qa.main.domain.Guest;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest // Tells SpringBoot this is a test class
@AutoConfigureMockMvc // Configures our MockMvc for testing
@Sql(scripts = { "classpath:testSchema.sql",
		"classpath:testData.sql" }, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD) // Populate the test database
																						// before tests, and refresh
																						// each time
@ActiveProfiles("test") // Use to temporarily switch to H2 database for testing
public class GuestControllerIntegrationTest {
	@Autowired // Generating a mock mvc - enables sending of mock HTTP requests
	private MockMvc mvc;

	@Autowired // Generating a mock object mapper - converts objects to JSON
	private ObjectMapper mapper;

	@Test
	public void createTest() throws Exception {
		// 1) Create an object for posting
		Guest create = new Guest("James Bradfield", "jamesbradfield270901@gmail.com");
		String createJSON = mapper.writeValueAsString(create); // turn it into a JSON object

		// 2) Create the expected object
		Guest expected = new Guest(2L, false, "James Bradfield", "jamesbradfield270901@gmail.com", "rootin-tootin", false, false,
				false, false);
		String expectedJSON = mapper.writeValueAsString(expected);

		// 3) Invoke the create method and compare the resulting object to expected
		mvc.perform(post("/create").contentType(MediaType.APPLICATION_JSON).content(createJSON))
				.andExpect(content().json(expectedJSON));
	}
	
	@Test
	public void setupTest() throws Exception {
		Guest host = new Guest("Sue Donym", "sue-donym@gmail.com", "admin");
		String hostJSON = mapper.writeValueAsString(host);
		
		Guest expect = new Guest (1L, true, "Sue Donym", "sue-donym@gmail.com", "admin", true, true, false, false);
		String expectJSON = mapper.writeValueAsString(expect);
		
		mvc.perform(post("/setup").contentType(MediaType.APPLICATION_JSON).content(hostJSON)).andExpect(content().json(expectJSON));
	}

	@Test
	public void viewAllTest() throws Exception {
		List<Guest> result = new ArrayList<>();
		result.add(new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false,
				false));

		String resultJSON = mapper.writeValueAsString(result);

		mvc.perform(get("/viewAll").contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(resultJSON));
	}

	@Test
	public void view() throws Exception {
		Guest guest = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false,
				false);
		String guestJSON = mapper.writeValueAsString(guest);

		mvc.perform(get("/view?id=1").contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(guestJSON));
	}

	@Test
	public void viewEmail() throws Exception {
		Guest guest = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, false,
				false);
		String guestJSON = mapper.writeValueAsString(guest);

		mvc.perform(get("/viewEmail?email=emily-bradfield@outlook.com").contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(guestJSON));
	}

	@Test
	public void updateTest() throws Exception {
		Guest update = new Guest(1L, true, "Emmy Bradfield", "emily-bradfield@outlook.com", "root", true, true, false,
				false);
		String updateJSON = mapper.writeValueAsString(update);

		Guest expected = new Guest(1L, true, "Emmy Bradfield", "emily-bradfield@outlook.com", "root", true, true, false,
				false);
		String expectedJSON = mapper.writeValueAsString(expected);

		mvc.perform(put("/update?id=1").contentType(MediaType.APPLICATION_JSON).content(updateJSON))
				.andExpect(content().json(expectedJSON));
	}

	@Test
	public void respondTest() throws Exception {
		Guest respond = new Guest(true, true, false);
		String respondJSON = mapper.writeValueAsString(respond);

		Guest expected = new Guest(1L, true, "Emily Bradfield", "emily-bradfield@outlook.com", "root", true, true, true,
				false);
		String expectedJSON = mapper.writeValueAsString(expected);

		mvc.perform(put("/respond?id=1").contentType(MediaType.APPLICATION_JSON).content(respondJSON))
				.andExpect(content().json(expectedJSON));
	}
	
	@Test
	public void activateTest() throws Exception {
		Guest inactive = new Guest("James Bradfield", "jamesbradfield270901@gmail.com");
		String inactiveJSON = mapper.writeValueAsString(inactive);
		
		Guest active = new Guest (2L, false, "James Bradfield", "jamesbradfield270901@gmail.com", "rootin-tootin", true, false, false, false);
		String activeJSON = mapper.writeValueAsString(active);
		
		mvc.perform(post("/create").contentType(MediaType.APPLICATION_JSON).content(inactiveJSON));
		mvc.perform(put("/activate?id=2").contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(activeJSON));
	}

	@Test
	public void deleteTest() throws Exception {
		mvc.perform(delete("/delete?id=1")).andExpect(status().isOk());
	}

}
