package com.transformarparaeducar.api_tfi.domain.person.infrastructure.persistence;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import com.transformarparaeducar.api_tfi.domain.person.core.model.PersonIdentifier;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing.PersonDatabase;
import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserIdentifier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PersonDatabaseAdapter implements PersonDatabase {

    private final PersonRepository personRepository;

    @Override
    public PersonIdentifier save(Person person) {
        Person saved = personRepository.save(person);
        return new PersonIdentifier(saved.getId());
    }

    @Override
    public GetStudentDTO findById(PersonIdentifier personId) {
        return null;
    }

    @Override
    public Optional<Person> findByEmailAddress(String email) {
        return Optional.empty();
    }

    @Override
    public Optional<Person> findByDni(Long dni) {
        return personRepository.findByDni(dni);
    }

    @Override
    public void saveAndFlush(Person person) {
        personRepository.saveAndFlush(person);
    }
}
