package com.transformarparaeducar.api_tfi.infrastructure;

import com.transformarparaeducar.api_tfi.domain.user.application.UserFacade;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserDomainConfig {

    @Bean
    public UserFacade userFacade(UserDatabase database, PasswordEncoder passwordEncoder) {
        return new UserFacade(database, passwordEncoder);
    }
}