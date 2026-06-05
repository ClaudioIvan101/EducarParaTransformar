package com.transformarparaeducar.api_tfi.domain.person.infrastructure.web;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.AddStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.AddNewStudent;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.AddStudentsByFile;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.GetStudent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final AddNewStudent addNewStudent;
    private final GetStudent getStudent;
    private final AddStudentsByFile addStudentsByFile;

    @PostMapping("")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> addNewStudent(@RequestBody AddStudentDTO addStudentDTO){
        addNewStudent.handle(addStudentDTO);
        return new ResponseEntity<>("Nueva persona creada", HttpStatus.CREATED);
    }

    @PostMapping("/addStudentsByFile")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> addStudentsByFile(@RequestParam(value = "file", required = false) MultipartFile file){
        if (file!=null && !file.isEmpty()) {
            if (file.getSize() > 10485760) { // 10 MB
                System.out.println("El archivo es demasiado grande, debe ser menor a 10MB");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                Boolean success = addStudentsByFile.handle(file);
                if (!success) {
                    return new ResponseEntity<>("Error al procesar el archivo", HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return new ResponseEntity<>("Nueva persona creada", HttpStatus.CREATED);
            }
        } else{
            return new ResponseEntity<>("Archivo incorrecto o vacío", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{personId}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<GetStudentDTO> getStudentById(@PathVariable Long personId){
        GetStudentDTO getStudentDTO = getStudent.handle(personId);
        if (getStudentDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(getStudentDTO, HttpStatus.OK);
    }

    @PutMapping("/{personId}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> updateStudent(@PathVariable Long personId, @RequestBody AddStudentDTO addStudentDTO){
        GetStudentDTO getStudentDTO = getStudent.handle(personId);
        if (getStudentDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else{
            addNewStudent.handle(addStudentDTO);
        }
        return new ResponseEntity<>("Usuario actualizado", HttpStatus.OK);
    }
}
