package com.transformarparaeducar.api_tfi.infrastructure;

import com.transformarparaeducar.api_tfi.domain.person.application.StudentFacade;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing.PersonDatabase;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PersonDomainConfig {

    @Bean
    public StudentFacade studentFacade(PersonDatabase personDatabase, PasswordEncoder passwordEncoder, UserDatabase userDatabase) {
        return new StudentFacade(personDatabase, passwordEncoder, userDatabase);
    }
}
