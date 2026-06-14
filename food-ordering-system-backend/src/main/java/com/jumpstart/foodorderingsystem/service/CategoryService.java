package com.jumpstart.foodorderingsystem.service;

import com.jumpstart.foodorderingsystem.dto.CategoryDto;

import java.util.List;

/**
 * CategoryService defines the business logic contract for category operations.
 *
 * Using an interface here follows the Dependency Inversion Principle:
 * the Controller depends on this abstraction, not on a concrete implementation.
 * This makes it easy to swap out the implementation (e.g. for testing) without
 * changing any controller code.
 */
public interface CategoryService {

    /**
     * Retrieves all food categories from the database.
     * @return a list of CategoryDto objects
     */
    List<CategoryDto> getAllCategories();

    /**
     * Retrieves a single category by its ID.
     * @param id the category's database ID
     * @return the matching CategoryDto
     * @throws com.jumpstart.foodorderingsystem.exception.CategoryNotFoundException if not found
     */
    CategoryDto getCategoryById(Long id);
}
