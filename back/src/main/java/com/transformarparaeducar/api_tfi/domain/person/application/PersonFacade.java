package com.transformarparaeducar.api_tfi.domain.person.application;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.AddStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.model.EducationalLevel;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import com.transformarparaeducar.api_tfi.domain.person.core.model.PersonIdentifier;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Student;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.AddNewStudent;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.GetStudent;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing.PersonDatabase;
import com.transformarparaeducar.api_tfi.domain.user.core.model.EmailAddress;
import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserRequestStatus;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserRole;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Set;

public class PersonFacade implements AddNewStudent, GetStudent {

    private final PersonDatabase personDatabase;

    private final UserDatabase userDatabase;

    private final PasswordEncoder passwordEncoder;

    public PersonFacade(PersonDatabase personDatabase, PasswordEncoder passwordEncoder, UserDatabase userDatabase) {
        this.personDatabase = personDatabase;
        this.passwordEncoder = passwordEncoder;
        this.userDatabase = userDatabase;
    }

    @Override
    public PersonIdentifier handle(AddStudentDTO addStudentDTO) {
        Person student = new Student(
                addStudentDTO.getFirstName().trim(),
                addStudentDTO.getLastName().trim(),
                addStudentDTO.getEmail().trim(),
                Long.parseLong(addStudentDTO.getDni().trim()),
                getLocalDate(addStudentDTO.getBirthDate()),
                addStudentDTO.getSchoolYear(),
                addStudentDTO.getDivision(),
                EducationalLevel.fromLevelName(addStudentDTO.getEducationalLevel().trim().toUpperCase()),
                generateFileNumber(addStudentDTO)
        );
        if (addStudentDTO.getPassword() != null && !addStudentDTO.getPassword().trim().isEmpty()) {
            User user = new User(
                    new EmailAddress(addStudentDTO.getEmail().trim()),
                    addStudentDTO.getFirstName().trim(),
                    addStudentDTO.getLastName().trim(),
                    passwordEncoder.encode(addStudentDTO.getPassword().trim()),
                    Set.of(UserRole.STUDENT),
                    UserRequestStatus.APPROVED
            );
            userDatabase.save(user);
        }
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

    private String generateFileNumber(AddStudentDTO addStudentDTO) {
        // Genera un legajo único basado en el DNI y el año de ingreso
        String dniPart = String.valueOf(addStudentDTO.getDni()).substring(0, addStudentDTO.getDni().length()); //el dni completo
        String yearPart = String.valueOf(LocalDate.now().getYear());
        return "EST-" + dniPart + "-" + yearPart;
    }
}
