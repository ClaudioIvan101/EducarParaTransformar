package com.transformarparaeducar.api_tfi.domain.person.infrastructure.persistence;

import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query("SELECT p FROM Person p WHERE p.dni = :dni")
    Optional<Person> findByDni(Long dni);
}
