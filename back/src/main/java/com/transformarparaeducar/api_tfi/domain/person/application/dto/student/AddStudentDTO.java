package com.transformarparaeducar.api_tfi.domain.person.application.dto.student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddStudentDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String dni;
    private String birthDate;
    private List<String> phoneNumbers;
    private String password;
    private String schoolYear;
    private String division;
}
