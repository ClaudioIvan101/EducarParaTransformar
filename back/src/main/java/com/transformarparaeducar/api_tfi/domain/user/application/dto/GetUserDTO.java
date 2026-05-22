package com.transformarparaeducar.api_tfi.domain.user.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserDTO {
    private String email;
    private String firstName;
    private String lastName;
}