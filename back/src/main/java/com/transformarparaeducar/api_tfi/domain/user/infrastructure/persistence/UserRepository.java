package com.transformarparaeducar.api_tfi.domain.user.infrastructure.persistence;

import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserIdentifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.emailAddress.value = :email")
    Optional<User> findByEmailAddress(String email);

    Optional<User> findUserById(Long userId);
}