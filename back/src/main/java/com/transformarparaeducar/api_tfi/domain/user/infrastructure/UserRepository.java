package com.transformarparaeducar.api_tfi.domain.user.infrastructure;

import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.emailAddress.value = :email")
    Optional<User> findByEmailAddress(String email);
}