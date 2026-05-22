package com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.AddUserDTO;
import com.transformarparaeducar.api_tfi.domain.user.core.model.UserIdentifier;

public interface AddNewUser {
    UserIdentifier handle(AddUserDTO addUserDTO);
}