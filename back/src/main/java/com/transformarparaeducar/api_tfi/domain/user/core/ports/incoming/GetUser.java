package com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming;

import com.transformarparaeducar.api_tfi.domain.user.application.dto.GetUserDTO;

public interface GetUser {
    GetUserDTO handle(Long userId);
}
