package com.jumpstart.foodorderingsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * FoodOrderingSystemApplication is the entry point of the Spring Boot application.
 *
 * @SpringBootApplication is a convenience annotation that combines:
 *   - @Configuration      : marks this as a source of bean definitions
 *   - @EnableAutoConfiguration : tells Spring Boot to auto-configure based on dependencies
 *   - @ComponentScan      : scans this package and sub-packages for Spring components
 */
@SpringBootApplication
public class FoodOrderingSystemApplication {
// Backend entry point:
    public static void main(String[] args) {
        SpringApplication.run(FoodOrderingSystemApplication.class, args);
    }
}
