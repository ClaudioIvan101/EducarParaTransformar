package com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.GetUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserIdentifier;

import java.sql.SQLException;
import java.util.Optional;

public interface UserDatabase {
    UserIdentifier save(User user);

    GetUserDTO findById(UserIdentifier userId);

    Optional<User> findByEmailAddress(String email);
}