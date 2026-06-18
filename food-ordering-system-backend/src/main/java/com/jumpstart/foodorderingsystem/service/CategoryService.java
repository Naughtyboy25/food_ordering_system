package com.jumpstart.foodorderingsystem.service;

import com.jumpstart.foodorderingsystem.dto.CategoryDto;

import java.util.List;

/**
 * CategoryService defines the business logic contract for category operations.
 */
public interface CategoryService {

    /**
     * Retrieves all food categories from the database.
     */
    List<CategoryDto> getAllCategories();

    /**
     * Retrieves a single category by its ID.
     * @throws com.jumpstart.foodorderingsystem.exception.CategoryNotFoundException if not found
     */
    CategoryDto getCategoryById(Long id);

    /**
     * Creates a new category.
     * @param dto the category data from the request
     * @return the created CategoryDto, including its generated ID
     */
    CategoryDto addCategory(CategoryDto dto);

    /**
     * Updates an existing category.
     * @param id the ID of the category to update
     * @param dto the updated category data
     * @return the updated CategoryDto
     * @throws com.jumpstart.foodorderingsystem.exception.CategoryNotFoundException if not found
     */
    CategoryDto updateCategory(Long id, CategoryDto dto);
}
