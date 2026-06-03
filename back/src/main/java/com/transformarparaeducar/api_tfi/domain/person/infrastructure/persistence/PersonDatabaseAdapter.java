package com.transformarparaeducar.api_tfi.domain.person.infrastructure.persistence;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import com.transformarparaeducar.api_tfi.domain.person.core.model.PersonIdentifier;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing.PersonDatabase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PersonDatabaseAdapter implements PersonDatabase {


    @Override
    public PersonIdentifier save(Person person) {
        return null;
    }

    @Override
    public GetStudentDTO findById(PersonIdentifier personId) {
        return null;
    }

    @Override
    public Optional<Person> findByEmailAddress(String email) {
        return Optional.empty();
    }
}
