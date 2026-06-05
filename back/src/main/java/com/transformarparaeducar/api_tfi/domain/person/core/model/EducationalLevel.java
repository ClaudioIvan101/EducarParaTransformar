package com.transformarparaeducar.api_tfi.domain.person.core.model;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum EducationalLevel {
    KINDERGARTEN("Jardin de Infantes"),
    PRIMARY("Primaria"),
    SECONDARY("Secundaria");

    private final String levelName;

    EducationalLevel(String levelName) {
        this.levelName = levelName;
    }

    public static EducationalLevel fromLevelName(String levelName) {
        return Arrays.stream(values())
                .filter(e -> e.levelName.equalsIgnoreCase(levelName.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Nivel educativo inválido: " + levelName
                ));
    }
}
