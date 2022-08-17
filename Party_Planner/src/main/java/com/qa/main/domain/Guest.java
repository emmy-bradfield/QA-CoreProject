package com.qa.main.domain;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Guest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private Boolean host;
	@Column(nullable = false)
	private String name;
	@Column
	private String email;
	@Column
	private String password;
	@Column
	private Boolean active;
	@Column
	private Boolean attend;
	@Column
	private Boolean accom;
	@Column
	private Boolean park;

	public Guest() {
	};
	
	public Guest(String name, String email) {
		this.name=name;
		this.email=email;
	}
	public Guest(String name, String email, String password) {
		this.name=name;
		this.email=email;
		this.password=password;
	}
	
	public Guest(Boolean attend, Boolean accom, Boolean park) {
		this.attend=attend;
		this.accom=accom;
		this.park=park;
	}
	
	public Guest(Long id, Boolean host, String name, String email, String password, Boolean active, Boolean attend, Boolean accom, Boolean park) {
		this.id=id;
		this.host=host;
		this.name=name;
		this.email=email;
		this.password=password;
		this.attend=attend;
		this.active=active;
		this.accom=accom;
		this.park=park;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Boolean getHost() {
		return host;
	}
	public void setHost(Boolean host) {
		this.host = host;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public Boolean getAttend() {
		return attend;
	}
	public void setAttend(Boolean attend) {
		this.attend = attend;
	}
	public Boolean getAccom() {
		return accom;
	}
	public void setAccom(Boolean accom) {
		this.accom = accom;
	}
	public Boolean getPark() {
		return park;
	}
	public void setPark(Boolean park) {
		this.park = park;
	}

	@Override
	public int hashCode() {
		return Objects.hash(accom, active, attend, email, host, id, name, park, password);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Guest other = (Guest) obj;
		return Objects.equals(accom, other.accom) && Objects.equals(active, other.active)
				&& Objects.equals(attend, other.attend) && Objects.equals(email, other.email)
				&& Objects.equals(host, other.host) && Objects.equals(id, other.id) && Objects.equals(name, other.name)
				&& Objects.equals(park, other.park) && Objects.equals(password, other.password);
	}


}