package com.transformarparaeducar.api_tfi.domain.person.infrastructure.web;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.AddStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.AddNewStudent;
import com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming.GetStudent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final AddNewStudent addNewStudent;
    private final GetStudent getStudent;

    @PostMapping("")
    public ResponseEntity<String> addNewStudent(@RequestBody AddStudentDTO addStudentDTO){
        addNewStudent.handle(addStudentDTO);
        return new ResponseEntity<>("Nueva persona creada", HttpStatus.CREATED);
    }

    @GetMapping("/{personId}")
    public ResponseEntity<GetStudentDTO> getStudentById(@PathVariable Long personId){
        GetStudentDTO getStudentDTO = getStudent.handle(personId);
        if (getStudentDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(getStudentDTO, HttpStatus.OK);
    }

    @PutMapping("/{personId}")
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
