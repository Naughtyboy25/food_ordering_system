package com.jumpstart.foodorderingsystem.service.impl;

import com.jumpstart.foodorderingsystem.dto.MenuItemDto;
import com.jumpstart.foodorderingsystem.entity.MenuItem;
import com.jumpstart.foodorderingsystem.exception.MenuItemNotFoundException;
import com.jumpstart.foodorderingsystem.repository.MenuItemRepository;
import com.jumpstart.foodorderingsystem.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * MenuItemServiceImpl is the concrete implementation of MenuItemService.
 */
@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemRepository menuItemRepository;

    @Override
    public List<MenuItemDto> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemDto getMenuItemById(Long id) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new MenuItemNotFoundException(
                        "Menu item not found with id: " + id));
        return mapToDto(item);
    }

    @Override
    public List<MenuItemDto> getMenuItemsByCategory(String category) {
        return menuItemRepository.findByCategory(category).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemDto addMenuItem(MenuItemDto dto) {
        MenuItem item = mapToEntity(dto);
        MenuItem saved = menuItemRepository.save(item);
        return mapToDto(saved);
    }

    @Override
    public MenuItemDto updateMenuItem(Long id, MenuItemDto dto) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new MenuItemNotFoundException(
                        "Menu item not found with id: " + id));
        item.setName(dto.getName());
        item.setCategory(dto.getCategory());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        MenuItem updated = menuItemRepository.save(item);
        return mapToDto(updated);
    }

    @Override
    public void deleteMenuItem(Long id) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new MenuItemNotFoundException(
                        "Menu item not found with id: " + id));
        menuItemRepository.delete(item);
    }

    private MenuItemDto mapToDto(MenuItem item) {
        return new MenuItemDto(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getDescription(),
                item.getPrice()
        );
    }

    private MenuItem mapToEntity(MenuItemDto dto) {
        return new MenuItem(
                dto.getId(),
                dto.getName(),
                dto.getCategory(),
                dto.getDescription(),
                dto.getPrice()
        );
    }
}
