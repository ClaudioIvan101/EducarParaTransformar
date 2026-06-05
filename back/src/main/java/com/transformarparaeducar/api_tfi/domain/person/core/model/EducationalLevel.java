package com.transformarparaeducar.api_tfi.domain.person.core.model;

import lombok.Getter;

@Getter
public enum EducationalLevel {
    KINDERGARTEN("Jardín de Infantes"),
    PRIMARY("Primaria"),
    SECONDARY("Secundaria");

    private final String levelName;

    EducationalLevel(String levelName) {
        this.levelName = levelName;
    }
}
