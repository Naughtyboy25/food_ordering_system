package com.jumpstart.foodorderingsystem.repository;

import com.jumpstart.foodorderingsystem.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * MenuItemRepository provides CRUD operations for MenuItem entities.
 *
 * Spring Data JPA automatically implements the custom finder
 * findByCategory(String category) at runtime.
 */
@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    List<MenuItem> findByCategory(String category);
}
