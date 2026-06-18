package com.jumpstart.foodorderingsystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * MenuItemDto is a Data Transfer Object for menu items.
 *
 * It carries the data between the frontend and the service layer,
 * without exposing the JPA entity directly.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuItemDto {

    private Long id;

    @NotBlank(message = "Item name is required")
    @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
    private String name;

    @NotBlank(message = "Category is required")
    @Size(min = 2, max = 50, message = "Category must be 2-50 characters")
    private String category;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;

    @Positive(message = "Price must be greater than 0")
    private Double price;
}
