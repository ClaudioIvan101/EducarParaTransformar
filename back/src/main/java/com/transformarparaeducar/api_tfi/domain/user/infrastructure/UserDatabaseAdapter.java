package com.transformarparaeducar.api_tfi.domain.user.infrastructure;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.GetUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserIdentifier;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserDatabaseAdapter implements UserDatabase {

    private final UserRepository userRepository;

    @Override
    public UserIdentifier save(User user) {
        User saved = userRepository.save(user);
        return new UserIdentifier(saved.getId());
    }

    @Override
    public GetUserDTO findById(UserIdentifier id) {
        return userRepository.findById(id.getAsLong())
                .map(user -> new GetUserDTO(
                        user.getEmailAddress().value(),
                        user.getFirstName(),
                        user.getLastName()
                ))
                .orElse(null);
    }

    @Override
    public Optional<User> findByEmailAddress(String email) {
        return userRepository.findByEmailAddress(email);  // ← nombre actualizado
    }
}