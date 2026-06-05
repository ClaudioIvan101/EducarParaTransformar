package com.transformarparaeducar.api_tfi.domain.person.application;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.AddStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.model.EducationalLevel;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import com.transformarparaeducar.api_tfi.domain.person.core.model.PersonIdentifier;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Student;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.AddNewStudent;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.AddStudentsByFile;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.GetStudent;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing.PersonDatabase;
import com.transformarparaeducar.api_tfi.domain.user.core.model.EmailAddress;
import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserRequestStatus;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserRole;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Set;

public class PersonFacade implements AddNewStudent, GetStudent, AddStudentsByFile {

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
                generateFileNumber(addStudentDTO.getDni().trim())
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
        Optional<Person> personOptional = personDatabase.findById(personId);

        return personOptional.map(person -> new GetStudentDTO(
                person.getFirstName(),
                person.getLastName(),
                person.getEmail(),
                String.valueOf(person.getDni()),
                getLocalDate(person.getBirthDate()),
                person.getPhoneNumbers()
        )).orElse(null);
    }

    private String getLocalDate(LocalDate localDate){
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        return localDate.format(format);
    }

    private LocalDate getLocalDate(String localDate){
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return LocalDate.parse(localDate, format);
    }

    private String generateFileNumber(String addStudentDni) {
        // Genera un legajo único basado en el DNI y el año de ingreso
        String yearPart = String.valueOf(LocalDate.now().getYear());
        return "EST-" + addStudentDni + "-" + yearPart;
    }

    @Override
    public Boolean handle(MultipartFile file) {

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream()))) {

            String line;
            boolean firstLine = true;

            while ((line = reader.readLine()) != null) {

                try {

                    if (firstLine) {
                        firstLine = false;
                        continue;
                    }

                    String[] data = line.split(",");

                    String firstName = data[0].trim();
                    String lastName = data[1].trim();
                    String email = data[2].trim();
                    Long dni = Long.parseLong(data[3].trim());

                    Optional<Person> existingStudent =
                            personDatabase.findByDni(dni);

                    if (existingStudent.isPresent()) {
                        System.out.println("Alumno ya existe. DNI: "+ dni);
                        continue;
                    }

                    Student student = new Student(
                            firstName,
                            lastName,
                            email,
                            dni,
                            getLocalDate(data[4].trim()),
                            data[5].trim(),
                            data[6].trim(),
                            EducationalLevel.fromLevelName(data[7].trim().toUpperCase()),
                            generateFileNumber(
                                    dni.toString()
                            )
                    );

                    personDatabase.save(student);

                } catch (Exception e) {
                    System.out.println("Error procesando línea: " + line + ". Error: " + e.getMessage());
                }
            }

            return true;

        } catch (IOException e) {
            System.out.println("Error leyendo archivo CSV: "+ e);
            return false;
        }
    }
}
