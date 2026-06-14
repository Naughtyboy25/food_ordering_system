package com.jumpstart.foodorderingsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * ApplicationConfig holds application-wide Spring beans and configuration.
 *
 * What is @Configuration?
 *   - It marks this class as a source of bean definitions for the Spring container.
 *   - Methods annotated with @Bean inside this class produce objects managed by Spring.
 *   - Think of it as a factory class that Spring reads during startup.
 *
 * This config also sets up CORS (Cross-Origin Resource Sharing).
 * CORS is a browser security feature that blocks requests from a different
 * origin (domain/port) unless the server explicitly allows it.
 * Our Angular app runs on localhost:4200 and our API on localhost:8085 —
 * different ports = different origins — so we must allow it here.
 */
@Configuration
public class ApplicationConfig {

    /**
     * Configures CORS to allow the Angular frontend (port 4200)
     * to call the Spring Boot API (port 8085).
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "http://localhost:4200",  // Angular dev server
                                "http://localhost:3000"   // Alternative dev port
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false);
            }
        };
    }
}
