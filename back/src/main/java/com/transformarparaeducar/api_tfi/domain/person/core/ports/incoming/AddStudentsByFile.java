package com.transformarparaeducar.api_tfi.domain.person.core.ports.incoming;

import org.springframework.web.multipart.MultipartFile;

public interface AddStudentsByFile {
    Boolean handle(MultipartFile file);
}
