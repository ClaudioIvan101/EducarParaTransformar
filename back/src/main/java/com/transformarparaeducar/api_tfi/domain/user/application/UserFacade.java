package com.transformarparaeducar.api_tfi.domain.user.application;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.AddUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.application.dto.GetUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.core.model.*;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.AddNewUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.GetUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.UpdateUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.SQLException;
import java.util.stream.Collectors;


public class UserFacade implements AddNewUser, GetUser, UpdateUser {

    private final UserDatabase database;
    private final PasswordEncoder passwordEncoder;

    public UserFacade(UserDatabase database, PasswordEncoder passwordEncoder) {
        this.database = database;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserIdentifier handle(AddUserDTO addUserDTO){
        User user = new User(
                new EmailAddress(addUserDTO.getEmail()),
                addUserDTO.getFirstName(),
                addUserDTO.getLastName(),
                passwordEncoder.encode(addUserDTO.getPassword()),
                addUserDTO.getRoles().stream()
                        .map(UserRole::valueOf)
                        .collect(Collectors.toSet())
        );
        return database.save(user);
    }

    @Override
    public GetUserDTO handle(Long userId) {
        UserIdentifier userIdentifier = new UserIdentifier(userId);
        return database.findById(userIdentifier);
    }

    @Override
    public void handle(Long userId, String firstName, String lastName){
        UserIdentifier userIdentifier = new UserIdentifier(userId);
        GetUserDTO userDTO = database.findById(userIdentifier);
        if (userDTO != null) {
            User user = new User(
                    new EmailAddress(userDTO.getEmail()),
                    firstName,
                    lastName,
                    null,
                    null
            );
            database.save(user);
        }
    }
}