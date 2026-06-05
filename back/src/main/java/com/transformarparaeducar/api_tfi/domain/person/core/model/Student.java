package com.transformarparaeducar.api_tfi.domain.person.core.model;


import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

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
                   Long dni, LocalDate birthDate) {
        super(firstName, lastName, email, dni, birthDate);
    }

    public Student(String firstName, String lastName, String email,
                   Long dni, LocalDate birthDate,
                   String schoolYear, String division, EducationalLevel educationalLevel,
                   String fileNumber) {
        super(firstName, lastName, email, dni, birthDate);
        this.yearOfEnrollment = LocalDate.now().getYear();
        this.schoolYear = schoolYear;
        this.division = division;
        this.educationalLevel = educationalLevel;
        this.fileNumber = fileNumber; // Se asignará automáticamente al guardar
    }

    private String generateFileNumber() {
        // Genera un legajo único basado en el DNI y el año de ingreso
        String dniPart = String.valueOf(getDni()).substring(0, 6); // Últimos 6 dígitos del DNI
        String yearPart = String.valueOf(yearOfEnrollment);
        return "EST-" + dniPart + "-" + yearPart;
    }
}
