package com.jumpstart.foodorderingsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * CategoryDto is a Data Transfer Object (DTO).
 *
 * A DTO is a plain object used to carry data between layers of the application —
 * specifically between the Service layer and the Controller (which sends it to the client).
 *
 * Why not just send the Entity directly?
 *   - Entities are tied to the database schema. Exposing them directly can leak
 *     internal details (e.g. database IDs, sensitive columns, Hibernate proxies).
 *   - DTOs let you control exactly what data is sent to the frontend.
 *   - If the database schema changes, you can update the entity without breaking the API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

    private Long id;
    private String name;
}
