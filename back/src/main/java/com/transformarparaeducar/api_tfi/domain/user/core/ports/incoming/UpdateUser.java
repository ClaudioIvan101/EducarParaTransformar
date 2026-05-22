package com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming;

public interface UpdateUser {
        void handle(Long userId, String firstName, String lastName);
}
