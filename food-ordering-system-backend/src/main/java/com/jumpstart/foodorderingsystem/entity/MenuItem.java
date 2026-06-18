package com.jumpstart.foodorderingsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * MenuItem is a JPA entity that maps to the "menu_item" table.
 *
 * Each menu item belongs to a category by name. Keeping the category as a
 * simple string keeps the API easy for the frontend while still allowing
 * filtering by category.
 */
@Entity
@Table(name = "menu_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(length = 255)
    private String description;

    @Column(nullable = false)
    private Double price;
}
