package com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming;

import com.transformarparaeducar.api_tfi.domain.person.application.dto.student.AddStudentDTO;
import com.transformarparaeducar.api_tfi.domain.person.core.model.PersonIdentifier;

public interface AddNewStudent {
    PersonIdentifier handle(AddStudentDTO addStudentDTO);
}
