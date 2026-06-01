package com.transformarparaeducar.api_tfi.domain.person.application;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.AddStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import com.transformarparaeducar.api_tfi.domain.person.core.model.PersonIdentifier;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Student;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.AddNewStudent;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.GetStudent;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing.PersonDatabase;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class StudentFacade implements AddNewStudent, GetStudent {

    PersonDatabase personDatabase;

    public StudentFacade(PersonDatabase personDatabase) {
        this.personDatabase = personDatabase;
    }

    @Override
    public PersonIdentifier handle(AddStudentDTO addStudentDTO) {
        Person student = new Student(
                addStudentDTO.getFirstName().trim(),
                addStudentDTO.getLastName().trim(),
                addStudentDTO.getEmail().trim(),
                Long.parseLong(addStudentDTO.getDni().trim()),
                getLocalDate(addStudentDTO.getBirthDate()),
                addStudentDTO.getPhoneNumbers(),
                addStudentDTO.getSchoolYear(),
                addStudentDTO.getDivision()
        );
        return personDatabase.save(student);
    }

    @Override
    public GetStudentDTO handle(Long personId) {
        return null;
    }

    private String getLocalDate(LocalDate localDate){
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        return localDate.format(format);
    }

    private LocalDate getLocalDate(String localDate){
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return LocalDate.parse(localDate, format);
    }
}
