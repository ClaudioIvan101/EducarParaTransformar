package com.transformarparaeducar.api_tfi.domain.person.infrastructure.persistence;

import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {


}
