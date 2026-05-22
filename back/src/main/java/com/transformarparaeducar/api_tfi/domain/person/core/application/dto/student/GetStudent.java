package com.transformarparaeducar.api_tfi.domain.person.core.application.dto.student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetStudent {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Long dni;
    private String birthDate; // Formato: "yyyy-MM-dd"
    private Set<String> phoneNumbers;
}
