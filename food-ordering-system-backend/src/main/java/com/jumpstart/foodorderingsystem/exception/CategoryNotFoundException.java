package com.jumpstart.foodorderingsystem.exception;

/**
 * CategoryNotFoundException is a custom runtime exception.
 *
 * Why create custom exceptions?
 *   - They make error messages meaningful and specific to the domain.
 *   - They allow the application to distinguish between different error types
 *     (e.g. "not found" vs "bad request") and respond with appropriate HTTP codes.
 *   - Rather than letting a generic NullPointerException bubble up, a custom
 *     exception communicates clearly what went wrong.
 *
 * By extending RuntimeException, this is an unchecked exception —
 * it doesn't need to be declared in method signatures.
 */
public class CategoryNotFoundException extends RuntimeException {

    public CategoryNotFoundException(String message) {
        super(message);
    }
}
