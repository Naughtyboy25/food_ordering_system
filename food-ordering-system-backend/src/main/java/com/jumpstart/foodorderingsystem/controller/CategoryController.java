package com.jumpstart.foodorderingsystem.controller;

import com.jumpstart.foodorderingsystem.dto.CategoryDto;
import com.jumpstart.foodorderingsystem.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CategoryController is the REST API layer for category operations.
 *
 * The Controller's responsibilities:
 *   1. Receive HTTP requests from the client (browser, Postman, Angular)
 *   2. Delegate the work to the Service layer
 *   3. Return the result as an HTTP response (JSON)
 *
 * The Controller should NOT contain business logic — that belongs in the Service.
 * It only routes requests and formats responses.
 *
 * @RestController = @Controller + @ResponseBody
 *   Automatically serialises return values to JSON.
 *
 * @RequestMapping("/api/category")
 *   All endpoints in this class are prefixed with /api/category.
 *
 * @RequiredArgsConstructor (Lombok) injects CategoryService via the constructor.
 * This is the recommended way to do Dependency Injection in Spring Boot.
 *
 * Data flow:  HTTP Request → Controller → Service → Repository → Database
 *             HTTP Response ← Controller ← Service ← Repository ← Database
 */
@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * GET /api/category
     * Returns all food categories as a JSON array.
     *
     * Example response:
     * [
     *   { "id": 1, "name": "Fast Food" },
     *   { "id": 2, "name": "Pizza" }
     * ]
     */
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * GET /api/category/{id}
     * Returns a single category by its ID.
     * Returns 404 if the category does not exist.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long id) {
        CategoryDto category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }
}
