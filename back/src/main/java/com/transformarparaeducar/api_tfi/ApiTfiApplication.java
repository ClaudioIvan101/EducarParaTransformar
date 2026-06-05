package com.transformarparaeducar.api_tfi;

import com.transformarparaeducar.api_tfi.infrastructure.PersonDomainConfig;
import com.transformarparaeducar.api_tfi.infrastructure.UserDomainConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@Import({
		UserDomainConfig.class,
		PersonDomainConfig.class
})
public class ApiTfiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiTfiApplication.class, args);
	}

}
