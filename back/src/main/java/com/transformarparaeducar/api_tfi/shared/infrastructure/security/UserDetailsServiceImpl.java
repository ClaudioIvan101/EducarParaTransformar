package com.transformarparaeducar.api_tfi.shared.infrastructure.security;

import com.transformarparaeducar.api_tfi.domain.user.core.ports.outgoing.UserDatabase;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserDatabase userDatabase;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(">>> loadUserByUsername llamado con: " + username);

        return userDatabase.findByEmailAddress(username)
                .map(user -> new org.springframework.security.core.userdetails.User(
                        user.getEmailAddress().toString(),
                        user.getPassword(),
                        List.of()   // roles/authorities, por ahora vacío
                ))
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Usuario no encontrado: " + username
                ));
    }
}