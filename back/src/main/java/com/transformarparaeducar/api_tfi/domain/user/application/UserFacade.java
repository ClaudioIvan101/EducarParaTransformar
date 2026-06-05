package com.transformarparaeducar.api_tfi.domain.user.application;

import com.transformarparaeducar.api_tfi.domain.person.core.model.Student;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Teacher;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Tutor;
import com.transformarparaeducar.api_tfi.domain.user.application.dto.AddPersonUserDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.model.Person;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing.PersonDatabase;
import com.transformarparaeducar.api_tfi.domain.user.application.dto.AddUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.application.dto.GetUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.core.model.*;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.AddNewStudentUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.AddNewUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.GetUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.UpdateUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import com.transformarparaeducar.api_tfi.shared.exceptions.NotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


public class UserFacade implements AddNewUser, GetUser, UpdateUser, AddNewStudentUser {

    private final UserDatabase database;
    private final PersonDatabase personDatabase;
    private final PasswordEncoder passwordEncoder;

    public UserFacade(UserDatabase database, PasswordEncoder passwordEncoder, PersonDatabase personDatabase) {
        this.database = database;
        this.passwordEncoder = passwordEncoder;
        this.personDatabase = personDatabase;
    }

    @Override
    public UserIdentifier handle(AddUserDTO addUserDTO) {
        User user = buildUser(
                addUserDTO.getEmail(),
                addUserDTO.getFirstName(),
                addUserDTO.getLastName(),
                addUserDTO.getPassword(),
                addUserDTO.getRoles().stream()
                        .map(UserRole::valueOf)
                        .collect(Collectors.toSet()),
                UserRequestStatus.APPROVED
        );
        return database.save(user);
    }

    @Override
    public UserIdentifier handle(AddPersonUserDTO addPersonUserDTO) {
        Person person = personDatabase.findByDni(Long.valueOf(addPersonUserDTO.getDni().trim()))
                .orElseThrow(() -> new NotFoundException(
                        "No se encontró una persona con el DNI proporcionado"));

        User user = buildUser(
                addPersonUserDTO.getEmail(),
                person.getFirstName(),
                person.getLastName(),
                addPersonUserDTO.getPassword(),
                resolveRoles(person),
                UserRequestStatus.APPROVED
        );

        UserIdentifier userId = database.save(user);

        User savedUser = database.findUserById(userId)
                .orElseThrow(() -> new NotFoundException(
                        "Error al recuperar el usuario guardado"));

        person.setUser(savedUser);
        personDatabase.saveAndFlush(person);

        return userId;
    }

    @Override
    public GetUserDTO handle(Long userId) {
        return database.findById(new UserIdentifier(userId));
    }

    @Override
    public void handle(Long userId, String firstName, String lastName) {
        GetUserDTO userDTO = database.findById(new UserIdentifier(userId));
        if (userDTO != null) {
            User user = buildUser(
                    userDTO.getEmail(),
                    firstName,
                    lastName,
                    null,
                    null,
                    UserRequestStatus.APPROVED
            );
            database.save(user);
        }
    }

    private User buildUser(String email, String firstName, String lastName,
                           String rawPassword, Set<UserRole> roles,
                           UserRequestStatus status) {
        return new User(
                new EmailAddress(email),
                firstName,
                lastName,
                rawPassword != null ? passwordEncoder.encode(rawPassword) : null,
                roles,
                status
        );
    }

    private Set<UserRole> resolveRoles(Person person) {
        Set<UserRole> roles = new HashSet<>();
        if (person instanceof Student) roles.add(UserRole.STUDENT);
        if (person instanceof Teacher) roles.add(UserRole.TEACHER);
        if (person instanceof Tutor)   roles.add(UserRole.TUTOR);
        if (roles.isEmpty()) throw new IllegalStateException(
                "Tipo de persona no reconocido: " + person.getClass().getSimpleName());
        return roles;
    }
}