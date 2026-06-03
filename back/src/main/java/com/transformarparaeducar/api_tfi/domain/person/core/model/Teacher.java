package com.transformarparaeducar.api_tfi.domain.person.core.model;

import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Table(name = "docente")
public class Teacher extends Person {

    @Column(name = "fecha_contratacion")
    private LocalDate hireDate;

    @Column(name = "legajo", nullable = false, unique = true)
    private String fileNumber;

    public Teacher() {}

    public Teacher(String firstName, String lastName, String email,
                   Long dni, LocalDate birthDate, List<String> phoneNumbers) {
        super(firstName, lastName, email, dni, birthDate, phoneNumbers);
    }

    public Teacher(String firstName, String lastName, String email,
                   Long dni, LocalDate birthDate, List<String> phoneNumbers, LocalDate hireDate) {
        super(firstName, lastName, email, dni, birthDate, phoneNumbers);
        this.hireDate = hireDate;
        this.fileNumber = generateFileNumber();
    }

    private String generateFileNumber() {
        // Genera un legajo único basado en el DNI y la fecha de contratación
        String dniPart = String.valueOf(getDni()).substring(0, 4); // Últimos 4 dígitos del DNI
        String datePart = new java.text.SimpleDateFormat("yyyyMMdd").format(hireDate);
        return "DOC-" + dniPart + "-" + datePart;
    }
}