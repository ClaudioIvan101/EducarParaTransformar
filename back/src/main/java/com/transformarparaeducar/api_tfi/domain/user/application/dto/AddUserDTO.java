package com.transformarparaeducar.api_tfi.domain.user.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddUserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private Set<String> roles;
}