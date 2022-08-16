package com.qa.main.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qa.main.domain.Guest;

@Repository
public interface GuestRepo extends JpaRepository<Guest, Long> {

	Optional<Guest> findByEmail(String email);

}