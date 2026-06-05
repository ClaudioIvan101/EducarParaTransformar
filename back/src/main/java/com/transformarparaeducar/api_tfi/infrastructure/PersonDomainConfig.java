package com.transformarparaeducar.api_tfi.infrastructure;

import com.transformarparaeducar.api_tfi.domain.person.application.StudentFacade;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.outgoing.PersonDatabase;
import org.springframework.context.annotation.Bean;

public class PersonDomainConfig {

    @Bean
    public StudentFacade studentFacade(PersonDatabase personDatabase) {
        return new StudentFacade(personDatabase);
    }
}
