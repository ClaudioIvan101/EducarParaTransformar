package com.transformarparaeducar.api_tfi.domain.person.core.model;

import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserRole;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Table(name = "estudiante")
public class Student extends Person {

    private String fileNumber;

    @Column(name = "anio_ingreso")
    private Integer yearOfEnrollment;

    @Column(name = "anio_lectivo")
    private String schoolYear;

    @Column(name = "division")
    private String division;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_educativo", nullable = false)
    private EducationalLevel educationalLevel;


    public Student() {}

    public Student(String firstName, String lastName, String email,
                   Long dni, LocalDate birthDate, List<String> phoneNumbers) {
        super(firstName, lastName, email, dni, birthDate, phoneNumbers);
    }

    public Student(String firstName, String lastName, String email,
                   Long dni, LocalDate birthDate, List<String> phoneNumbers,
                   String schoolYear, String division) {
        super(firstName, lastName, email, dni, birthDate, phoneNumbers);
        this.fileNumber = generateFileNumber();
        this.yearOfEnrollment = java.time.Year.now().getValue();
        this.schoolYear = schoolYear;
        this.division = division;
    }

    private String generateFileNumber() {
        // Genera un legajo único basado en el DNI y el año de ingreso
        String dniPart = String.valueOf(getDni()).substring(0, 6); // Últimos 6 dígitos del DNI
        String yearPart = String.valueOf(yearOfEnrollment);
        return "EST-" + dniPart + "-" + yearPart;
    }
}
