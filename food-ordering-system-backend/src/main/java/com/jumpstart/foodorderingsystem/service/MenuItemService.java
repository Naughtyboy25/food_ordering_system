package com.jumpstart.foodorderingsystem.service;

import com.jumpstart.foodorderingsystem.dto.MenuItemDto;

import java.util.List;

/**
 * MenuItemService defines the contract for menu item operations.
 */
public interface MenuItemService {

    List<MenuItemDto> getAllMenuItems();

    MenuItemDto getMenuItemById(Long id);

    List<MenuItemDto> getMenuItemsByCategory(String category);

    MenuItemDto addMenuItem(MenuItemDto dto);

    MenuItemDto updateMenuItem(Long id, MenuItemDto dto);

    void deleteMenuItem(Long id);
}
