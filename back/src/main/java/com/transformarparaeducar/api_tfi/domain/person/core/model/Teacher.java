package com.transformarparaeducar.api_tfi.domain.person.core.model;

import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Table(name = "docente")
public class Teacher extends Person {

    @Column(name = "fecha_contratacion")
    private Date hireDate;

    @Column(name = "legajo", nullable = false, unique = true)
    private String fileNumber;

    public Teacher() {}

    public Teacher(String firstName, String lastName, String email,
                   Long dni, Date birthDate, List<String> phoneNumbers,
                   User user) {
        super(null, firstName, lastName, email, dni, birthDate, phoneNumbers, user);
    }

    public Teacher(String firstName, String lastName, String email,
                   Long dni, Date birthDate, List<String> phoneNumbers,
                   User user, Date hireDate, String fileNumber) {
        super(null, firstName, lastName, email, dni, birthDate, phoneNumbers, user);
        this.hireDate = hireDate;
        this.fileNumber = fileNumber;
    }
}