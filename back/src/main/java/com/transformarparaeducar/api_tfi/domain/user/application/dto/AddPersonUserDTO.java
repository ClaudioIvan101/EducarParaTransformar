package com.transformarparaeducar.api_tfi.domain.user.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddPersonUserDTO {
    private String email;
    private String dni;
    private String password;
}
