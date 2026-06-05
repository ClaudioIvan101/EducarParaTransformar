package com.transformarparaeducar.api_tfi.domain.user.core.ports.incoming;

import java.sql.SQLException;

public interface UpdateUser {
        void handle(Long userId, String firstName, String lastName) throws SQLException;
}
