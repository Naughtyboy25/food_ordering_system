package com.jumpstart.foodorderingsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Category is a JPA entity that maps to the "category" table in the database.
 *
 * An entity represents a real-world object (in this case, a food category).
 * Spring Data JPA uses Hibernate under the hood to translate this class
 * into SQL CREATE TABLE / SELECT / INSERT statements automatically.
 *
 * Lombok annotations (@Getter, @Setter, etc.) generate boilerplate code
 * like getters, setters and constructors at compile time — keeping the
 * class clean and readable.
 */
@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    /**
     * @Id marks this field as the primary key.
     * @GeneratedValue with IDENTITY strategy means the database
     * will auto-increment this value for each new row.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The name of the food category (e.g. "Fast Food", "Pizza").
     */
    @Column(nullable = false, length = 100)
    private String name;
}
