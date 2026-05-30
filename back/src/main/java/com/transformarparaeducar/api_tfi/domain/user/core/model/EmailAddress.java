package com.transformarparaeducar.api_tfi.domain.user.core.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Embeddable
public class EmailAddress {

    @Column(name = "email", nullable = false, unique = true)
    private String value;

    public EmailAddress(String value) {
        this.value = value;
    }

    public String value() { return value; }

    protected EmailAddress() {}
}