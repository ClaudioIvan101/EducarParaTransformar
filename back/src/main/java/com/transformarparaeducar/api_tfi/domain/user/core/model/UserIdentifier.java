package com.transformarparaeducar.api_tfi.domain.user.core.model;

public class UserIdentifier {

    private final Long id;

    public UserIdentifier(Long id) {
        this.id = id;
    }

    public Long getAsLong(){
        return id;
    }
}