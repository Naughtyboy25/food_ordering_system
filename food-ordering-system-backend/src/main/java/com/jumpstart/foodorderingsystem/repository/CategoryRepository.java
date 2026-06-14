package com.jumpstart.foodorderingsystem.repository;

import com.jumpstart.foodorderingsystem.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * CategoryRepository is the data access layer for the Category entity.
 *
 * By extending JpaRepository<Category, Long>, Spring Data JPA automatically
 * provides a full set of CRUD operations without writing any SQL:
 *
 *   - findAll()       → SELECT * FROM category
 *   - findById(id)    → SELECT * FROM category WHERE id = ?
 *   - save(entity)    → INSERT or UPDATE
 *   - deleteById(id)  → DELETE FROM category WHERE id = ?
 *   - count()         → SELECT COUNT(*) FROM category
 *   - ... and more
 *
 * The @Repository annotation marks this as a Spring-managed component
 * and enables exception translation (converts database errors into
 * Spring's DataAccessException hierarchy).
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // No custom methods needed for now.
    // JpaRepository provides everything required for this assessment.
}
