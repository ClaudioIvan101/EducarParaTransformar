package com.transformarparaeducar.api_tfi.domain.person.core.model;

import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "persona")
@NoArgsConstructor  // JPA lo necesita en la clase raíz también
@Getter
public abstract class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombres", nullable = false)
    private String firstName;

    @Column(name = "apellidos", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "dni", nullable = false, unique = true)
    private Long dni;

    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate birthDate;

    @ElementCollection
    @CollectionTable(name = "persona_telefono",
            joinColumns = @JoinColumn(name = "persona_id"))
    @Column(name = "telefono")
    private List<String> phoneNumbers;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    private User user;

    public Person(String firstName, String lastName, String email, Long dni, LocalDate birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dni = dni;
        this.birthDate = birthDate;
    }
}