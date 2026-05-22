package com.transformarparaeducar.api_tfi.domain.person.core.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

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


    public Student() {}

    public Student(String firstName, String lastName, String email,
                   Long dni, java.util.Date birthDate, java.util.List<String> phoneNumbers,
                   com.transformarparaeducar.api_tfi.domain.user.core.model.User user) {
        super(null, firstName, lastName, email, dni, birthDate, phoneNumbers, user);
    }

    public Student(String firstName, String lastName, String email,
                   Long dni, java.util.Date birthDate, java.util.List<String> phoneNumbers,
                   com.transformarparaeducar.api_tfi.domain.user.core.model.User user,
                   String fileNumber, Integer yearOfEnrollment, String schoolYear, String division) {
        super(null, firstName, lastName, email, dni, birthDate, phoneNumbers, user);
        this.fileNumber = fileNumber;
        this.yearOfEnrollment = yearOfEnrollment;
        this.schoolYear = schoolYear;
        this.division = division;
    }
}
