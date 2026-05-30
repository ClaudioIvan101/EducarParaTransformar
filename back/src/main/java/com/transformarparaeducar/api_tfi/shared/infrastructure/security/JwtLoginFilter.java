package com.transformarparaeducar.api_tfi.shared.infrastructure.security;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.LoginRequest;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtService jwtService;

    public JwtLoginFilter(AuthenticationManager authManager, JwtService jwtService) {
        super(authManager);
        this.jwtService = jwtService;
        setFilterProcessesUrl("/auth/login");
    }

    // Lee el JSON del body
    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request,
            HttpServletResponse response) {

        System.out.println(">>> attemptAuthentication llamado");

        LoginRequest credentials = null;
        try {
            credentials = new ObjectMapper()
                    .readValue(request.getInputStream(), LoginRequest.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println(">>> email: " + credentials.getEmail());
        System.out.println(">>> password: " + credentials.getPassword());


        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        credentials.getEmail(),
                        credentials.getPassword()
                )
        );
    }

    // Si autenticó bien, genera y escribe el token en el response
    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication auth) throws IOException {

        String token = jwtService.generateToken(auth.getName());

        response.setContentType("application/json");
        response.getWriter().write("""
            { "token": "%s" }
            """.formatted(token));
    }
}