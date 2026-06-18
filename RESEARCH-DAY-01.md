# Day 01 — Category CRUD Research

## Research Questions

### Q1. What does CRUD stand for?

CRUD is a shortcut for the four basic operations you can do on data:

- **C**reate — add a new record
- **R**ead — fetch or view records
- **U**pdate — change an existing record
- **D**elete — remove a record

In a REST API these map to HTTP methods: POST, GET, PUT/PATCH, and DELETE.

### Q2. Difference between HTTP methods POST, PUT, PATCH, DELETE?

- **POST** — Creates a new resource. The server usually decides the new ID.
- **PUT** — Replaces an existing resource with the full new version.
- **PATCH** — Partially updates a resource (only the fields you send).
- **DELETE** — Removes a resource.

### Q3. Give the correct HTTP status code for each

| Situation | Status code |
|---|---|
| a. A new category was created | **201 Created** |
| b. A category was deleted successfully | **204 No Content** |
| c. The id requested does not exist | **404 Not Found** |
| d. The request body is missing a required field | **400 Bad Request** |
| e. The user is logged in but not allowed | **403 Forbidden** |

### Q4. Difference between @RequestBody, @RequestParam, @PathVariable

- **`@RequestBody`** — reads the JSON body of the request and turns it into a Java object.
  ```java
  public CategoryDto create(@RequestBody CategoryDto dto)
  ```
- **`@RequestParam`** — reads a value from the query string of the URL.
  ```java
  public List<CategoryDto> search(@RequestParam String name)
  ```
  Example URL: `GET /api/categories/search?name=Pizza`
- **`@PathVariable`** — reads a value from the URL path itself.
  ```java
  public CategoryDto getOne(@PathVariable Long id)
  ```
  Example URL: `GET /api/categories/3`

### Q5. What is Jakarta Bean Validation? Explain @Valid, @NotBlank, @Size.

Jakarta Bean Validation is a way to declare rules on Java objects so the framework checks them automatically instead of writing `if` statements by hand.

- **`@Valid`** — tells Spring to run the validation rules on the object.
- **`@NotBlank`** — a string must not be null and must contain at least one non-whitespace character.
- **`@Size(min = 2, max = 50)`** — a string/collection must have a length between 2 and 50.

Example:
```java
public class CategoryDto {
    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 50, message = "Name must be 2-50 characters")
    private String name;
}
```

### Q6. Why return a DTO and not the entity itself? Give 2 reasons.

1. **Hide internal details.** Entities may contain fields you do not want to expose, such as database IDs you do not need, Hibernate proxies, or future columns.
2. **Stability of the API contract.** If the database table changes, you can update the entity without breaking the JSON the frontend expects, because the DTO can stay the same.

### Q7. What is Optional<T>? Why does findById return Optional?

`Optional<T>` is a wrapper that either contains a value or is empty. It forces the caller to decide what to do when there is no value, instead of risking a `NullPointerException`.

`findById` returns `Optional<Category>` because the ID may or may not exist in the database. The service can then call `.orElseThrow(...)` to turn an empty result into a clean `404 Not Found` response.

---

## Self-Quiz

### Q1. Why ResponseEntity instead of returning the object?

`ResponseEntity` lets you control both the HTTP status code and the response body. For example, you can return `201 Created` on a successful POST or `204 No Content` on a DELETE, instead of always getting `200 OK`.

### Q2. What status should a successful DELETE return? Why?

**204 No Content.** A DELETE removes the resource, so there is nothing meaningful to send back. Returning 204 tells the client the action succeeded without returning a body.

### Q3. Update only one field — PUT or PATCH? Defend your answer.

**PATCH** is the better choice for a partial update because it means “change only the fields provided.” PUT means “replace the whole resource,” so sending only one field could accidentally clear the others. For this project we used PUT because the instructions asked for it, but PATCH would be more correct for a single-field change.

### Q4. What happens if you forget @Valid on the controller?

Spring will not run the validation annotations on the request body. Invalid input (empty name, name too long, etc.) would reach the service layer and could be saved to the database.

### Q5. Why must update/delete have `{id}` in the URL but create does not?

Update and delete target a specific existing resource, so the URL must identify that resource (`/api/categories/5`). Create makes a brand-new resource, so the server assigns the ID after saving it; the client does not know the ID yet.
