package com.transformarparaeducar.api_tfi.infrastructure;

import com.transformarparaeducar.api_tfi.domain.user.core.UserFacade;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.AddNewUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import com.transformarparaeducar.api_tfi.domain.user.infrastructure.UserDatabaseAdapter;
import com.transformarparaeducar.api_tfi.domain.user.infrastructure.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

public class UserDomainConfig {

    @Bean
    public UserDatabase userDatabase(UserRepository userRepository){
        return new UserDatabaseAdapter(userRepository);
    }

    @Bean
    public AddNewUser addNewUser(UserDatabase userDatabase){
        return new UserFacade(userDatabase);
    }
}