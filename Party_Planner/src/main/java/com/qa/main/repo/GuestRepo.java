package com.qa.main.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qa.main.domain.Guest;

@Repository
public interface GuestRepo extends JpaRepository<Guest, Long> {

	Guest findByEmail(String email);

}