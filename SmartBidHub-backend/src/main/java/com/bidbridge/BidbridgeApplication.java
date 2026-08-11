package com.bidbridge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
@EnableAsync
@SpringBootApplication
public class BidbridgeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BidbridgeApplication.class, args);
	}

}
