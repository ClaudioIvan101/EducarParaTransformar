package com.transformarparaeducar.api_tfi.domain.person.core.model;

public class PersonIdentifier {

    private final Long id;

    public PersonIdentifier(Long id) {
        this.id = id;
    }

    public Long getAsLong(){
        return id;
    }
}
