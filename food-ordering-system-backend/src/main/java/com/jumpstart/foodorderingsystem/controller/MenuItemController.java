package com.jumpstart.foodorderingsystem.controller;

import com.jumpstart.foodorderingsystem.dto.MenuItemDto;
import com.jumpstart.foodorderingsystem.service.MenuItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * MenuItemController exposes REST endpoints for managing menu items.
 *
 * All endpoints are prefixed with /api/menu-items.
 */
@RestController
@RequestMapping("/api/menu-items")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @GetMapping
    public ResponseEntity<List<MenuItemDto>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemService.getAllMenuItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemDto> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.getMenuItemById(id));
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<MenuItemDto>> getMenuItemsByCategory(
            @PathVariable String categoryName) {
        return ResponseEntity.ok(menuItemService.getMenuItemsByCategory(categoryName));
    }

    @PostMapping
    public ResponseEntity<MenuItemDto> createMenuItem(@RequestBody @Valid MenuItemDto dto) {
        MenuItemDto created = menuItemService.addMenuItem(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItemDto> updateMenuItem(
            @PathVariable Long id,
            @RequestBody @Valid MenuItemDto dto) {
        return ResponseEntity.ok(menuItemService.updateMenuItem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}
