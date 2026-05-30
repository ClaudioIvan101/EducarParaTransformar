package com.transformarparaeducar.api_tfi.domain.person.core.model;

import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.type.YesNoConverter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Table(name = "tutor")
public class Tutor extends Person{

    @Column(name = "relacion_con_estudiante", nullable = false)
    private String relationshipWithStudent;

    @Column(name = "vive_con_estudiante", nullable = false)
    @Convert(converter = YesNoConverter.class)
    private Boolean livesWithStudent;

    public Tutor(String firstName, String lastName, String email,
                   Long dni, Date birthDate, List<String> phoneNumbers,
                   User user) {
        super(null, firstName, lastName, email, dni, birthDate, phoneNumbers, user);
    }

    public Tutor() {}

    public Tutor(String firstName, String lastName, String email,
                   Long dni, Date birthDate, List<String> phoneNumbers,
                   User user, Date hireDate, String fileNumber) {
        super(null, firstName, lastName, email, dni, birthDate, phoneNumbers, user);
    }
}
