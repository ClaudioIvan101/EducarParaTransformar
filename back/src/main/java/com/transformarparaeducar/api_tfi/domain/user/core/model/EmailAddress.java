package com.transformarparaeducar.api_tfi.domain.user.core.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Embeddable
@EqualsAndHashCode
public class EmailAddress {

    @Column(name="email")
    private String value;

    public EmailAddress(String value) {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        Matcher matcher = pattern.matcher(value);
        if(matcher.matches()){
            this.value = value;
        } else {
            throw new IllegalArgumentException("El valor no es un email válido");
        }
    }

    private EmailAddress(){}
}