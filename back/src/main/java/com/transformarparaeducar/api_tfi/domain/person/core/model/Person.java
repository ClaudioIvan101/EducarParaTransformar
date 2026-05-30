package com.transformarparaeducar.api_tfi.domain.person.core.model;

import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "persona")
@AllArgsConstructor
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
    private Date birthDate;

    @ElementCollection
    @CollectionTable(name = "persona_telefono",
            joinColumns = @JoinColumn(name = "persona_id"))
    @Column(name = "telefono")
    private List<String> phoneNumbers;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    private User user;

}