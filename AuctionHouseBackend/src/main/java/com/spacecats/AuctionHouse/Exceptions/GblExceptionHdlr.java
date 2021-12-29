package com.spacecats.AuctionHouse.Exceptions;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;



@ControllerAdvice
public class GblExceptionHdlr {
	private static Logger log = LogManager.getRootLogger();
	@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="No user of that id")
	@ExceptionHandler(UNFException.class)
	public void handleUserNotFoundException() {
		// do shiny things like logging
		log.error(HttpStatus.NOT_FOUND+" Sadly we could not find that user.");
	}
	
	@ResponseStatus(value=HttpStatus.BAD_REQUEST, reason="bad")
	@ExceptionHandler(Exception.class)
	public void handleException() {
		// do something else
	}
}
