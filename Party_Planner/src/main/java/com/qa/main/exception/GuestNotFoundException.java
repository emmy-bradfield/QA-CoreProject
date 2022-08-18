package com.qa.main.exception;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.NOT_FOUND, reason="The identification number provided does not match any guests in the database: please try again")
public class GuestNotFoundException extends NoSuchElementException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -782372233827752742L;


}