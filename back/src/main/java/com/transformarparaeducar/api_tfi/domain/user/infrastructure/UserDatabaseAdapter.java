package com.transformarparaeducar.api_tfi.domain.user.infrastructure;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.GetUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserIdentifier;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserDatabaseAdapter implements UserDatabase {

    private final UserRepository userRepository;

    @Override
    public UserIdentifier save(User user) {
        User savedUser = userRepository.save(user);
        return new UserIdentifier(savedUser.getIdentifierAsLong());
    }

    @Override
    public GetUserDTO findById(UserIdentifier userId) {
        GetUserDTO getUserDTO = userRepository.findById(userId.getAsLong())
                .map(user -> new GetUserDTO(
                        user.getEmailAddress().toString(),
                        user.getFirstName(),
                        user.getLastName()
                ))
                .orElse(null);
        return getUserDTO;
    }

    @Override
    public GetUserDTO findByEmail(String email) {
        return userRepository.findByEmailAddress(email)
                    .map(user -> new GetUserDTO(
                            user.getEmailAddress().toString(),
                            user.getFirstName(),
                            user.getLastName()
                    ))
                    .orElse(null);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {

        return userRepository.findByEmailAddress(email);
    }
}