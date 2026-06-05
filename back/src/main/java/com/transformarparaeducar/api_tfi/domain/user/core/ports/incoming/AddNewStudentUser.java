package com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.AddPersonUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserIdentifier;

public interface AddNewStudentUser {
    UserIdentifier handle(AddPersonUserDTO addPersonUserDTO);
}
