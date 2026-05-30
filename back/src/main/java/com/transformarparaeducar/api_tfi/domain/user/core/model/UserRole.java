package com.transformarparaeducar.api_tfi.domain.user.core.model;

import lombok.Getter;

@Getter
public enum UserRole {
    STUDENT("ESTUDIANTE"),
    TUTOR("TUTOR"),
    EMPLOYEE("EMPLEADO"),
    ADMIN("ADMINISTRADOR");

    private final String role;

    UserRole(String role){ this.role = role;}
}
