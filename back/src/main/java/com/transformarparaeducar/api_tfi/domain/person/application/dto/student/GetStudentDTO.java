package com.transformarparaeducar.api_tfi.domain.person.application.dto.student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetStudentDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String dni;
    private String birthDate; // Formato: "yyyy-MM-dd"
    private List<String> phoneNumbers;
}
