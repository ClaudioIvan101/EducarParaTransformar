package com.transformarparaeducar.api_tfi.domain.user.core.model;

import lombok.Getter;

@Getter
public enum UserRequestStatus {
    APPROVED("APROBADO"),
    PENDING("PENDIENTE"),
    REJECTED("RECHAZADO");

    private final String status;

    UserRequestStatus(String status){ this.status = status;}
}
