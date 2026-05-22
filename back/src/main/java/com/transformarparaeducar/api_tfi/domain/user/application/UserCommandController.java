package com.transformarparaeducar.api_tfi.domain.user.application;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.AddUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.application.dto.GetUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.AddNewUser;
import com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming.GetUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserCommandController {

    private final AddNewUser addNewUser;
    private final GetUser getUser;

    @PostMapping("")
    public ResponseEntity<String> addNewUser(@RequestBody AddUserDTO addUserDTO){
        addNewUser.handle(addUserDTO);
        return new ResponseEntity<>("Nuevo usuario creado", HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<GetUserDTO> getUserById(@PathVariable Long userId){
        GetUserDTO getUserDTO = getUser.handle(userId);
        if (getUserDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(getUserDTO, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody AddUserDTO addUserDTO){
        GetUserDTO getUserDTO = getUser.handle(userId);
        if (getUserDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else{
            addNewUser.handle(addUserDTO);
        }
        return new ResponseEntity<>("Usuario actualizado", HttpStatus.OK);
    }
}