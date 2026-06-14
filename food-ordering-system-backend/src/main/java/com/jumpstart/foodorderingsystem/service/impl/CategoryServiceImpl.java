package com.jumpstart.foodorderingsystem.service.impl;

import com.jumpstart.foodorderingsystem.dto.CategoryDto;
import com.jumpstart.foodorderingsystem.entity.Category;
import com.jumpstart.foodorderingsystem.exception.CategoryNotFoundException;
import com.jumpstart.foodorderingsystem.repository.CategoryRepository;
import com.jumpstart.foodorderingsystem.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * CategoryServiceImpl is the concrete implementation of CategoryService.
 *
 * The Service layer sits between the Controller and the Repository.
 * Its responsibilities are:
 *   1. Coordinate calls to the repository (data access layer)
 *   2. Apply business logic (e.g. validation, transformation)
 *   3. Convert entities to DTOs before returning them to the controller
 *
 * @Service marks this as a Spring-managed service bean.
 * @RequiredArgsConstructor (Lombok) generates a constructor that injects
 * all final fields — this is constructor-based Dependency Injection.
 */
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    // Spring injects the CategoryRepository automatically via the constructor
    private final CategoryRepository categoryRepository;

    /**
     * Fetches all Category entities from the database,
     * converts each one into a CategoryDto, and returns the list.
     */
    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        // Use Java Streams to map each Category entity → CategoryDto
        return categories.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     * Fetches a single Category by ID.
     * Throws CategoryNotFoundException if no record exists with that ID.
     */
    @Override
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(
                        "Category not found with id: " + id));
        return mapToDto(category);
    }

    /**
     * Private helper: converts a Category entity to a CategoryDto.
     * Keeps the mapping logic in one place so it's easy to maintain.
     */
    private CategoryDto mapToDto(Category category) {
        return new CategoryDto(category.getId(), category.getName());
    }
}
