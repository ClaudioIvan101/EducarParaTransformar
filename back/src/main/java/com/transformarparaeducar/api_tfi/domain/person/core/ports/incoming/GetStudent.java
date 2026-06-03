package com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.GetStudentDTO;

public interface GetStudent {
    GetStudentDTO handle(Long personId);
}
