package com.transformarparaeducar.api_tfi.application;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class InstitutionHexagonalController {

    @GetMapping("")
    public String getAppRoot(){
        return "Library Hexagonal REST API";
    }
}