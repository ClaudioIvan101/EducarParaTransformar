package com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import com.transformarparaeducar.api_tfi.domain.person.core.model.PersonIdentifier;

import java.util.Optional;

public interface PersonDatabase {
    PersonIdentifier save(Person person);

    GetStudentDTO findById(PersonIdentifier personId);

    Optional<Person> findByEmailAddress(String email);
}
