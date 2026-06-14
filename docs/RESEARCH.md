# Research — JumpStart Eats

This document covers the core technologies used in the project and how they work together.

---

## Spring Boot

### What is Spring Boot?

Spring Boot is a Java framework that makes it easier to build stand-alone, production-ready web applications. It sits on top of the Spring Framework and removes most manual configuration by using sensible defaults and auto-configuration.

### How data flows through a Spring Boot application

```
HTTP Request
     ↓
Controller  (receives request, returns JSON)
     ↓
Service     (business logic, data mapping)
     ↓
Repository  (database access via Spring Data JPA)
     ↓
Database    (H2 or MySQL)
```

### Layers in this project

| Layer | Responsibility | Example |
|-------|----------------|---------|
| **Controller** | Handles HTTP requests and responses | `CategoryController` |
| **Service** | Contains business logic | `CategoryService` / `CategoryServiceImpl` |
| **Repository** | Talks to the database | `CategoryRepository` |
| **Entity** | Maps Java classes to database tables | `Category` |
| **DTO** | Transfers data between layers without exposing entities | `CategoryDto` |
| **Exception** | Handles errors consistently | `GlobalExceptionHandler` |

### DTO (Data Transfer Object)

A DTO is a plain object used to send data between layers or to the client. It keeps internal entity details private and lets you shape the data exactly how the frontend needs it.

```java
public class CategoryDto {
    private Long id;
    private String name;
}
```

### Dependency Injection (DI)

Dependency Injection means Spring creates and wires objects together instead of the developer creating them manually. This makes code easier to test and swap.

```java
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository; // injected by Spring
    }
}
```

Spring scans for `@Component`, `@Service`, `@Repository`, and `@Controller` classes and manages them as beans.

### Spring Data JPA

JPA (Java Persistence API) maps Java entities to database tables. Spring Data JPA provides repository interfaces so you don't write SQL manually.

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
```

This automatically gives you methods like `findAll()`, `findById()`, `save()`, and `deleteById()`.

### Profiles

Spring profiles let you use different configurations for different environments. The project uses the `dev` profile with H2 by default. For production, you can switch to MySQL.

---

## Angular

### Why Angular?

Angular is a TypeScript framework for building single-page applications (SPAs). It provides:

- A component-based architecture
- Built-in dependency injection
- A powerful router
- Reactive forms and HTTP client
- Strong tooling (CLI, TypeScript, testing)

### Standalone components

This project uses Angular 17 standalone components. Each component declares its own imports, so there is no need for an `NgModule`.

```typescript
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryListComponent],
  templateUrl: './menu.component.html'
})
export class MenuComponent {}
```

### Signals

Signals are Angular's reactive primitive. A signal holds a value and notifies consumers when that value changes. They make state management simple and explicit.

```typescript
const count = signal(0);
count.set(5);
console.log(count()); // 5
```

In this project, `CartService` uses signals to hold the cart and order history. Components read these signals in their templates, and Angular automatically updates the UI when the signal values change.

### Routing

Angular Router maps URLs to components:

```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent }
];
```

Query parameters are used to filter the menu by category: `/menu?category=Pizza`.

### HTTP client

The frontend uses `HttpClient` to call the backend REST API:

```typescript
this.http.get<Category[]>('http://localhost:8085/api/category')
```

During development, the Angular dev server proxies `/api` requests to the backend so the frontend does not need CORS.

---

## MySQL

### Why MySQL?

MySQL is a popular open-source relational database. It is a good choice when:

- Data has clear relationships (categories, items, orders, users)
- You need ACID transactions
- You want strong data integrity
- The application may grow and need complex queries

### How clients communicate with MySQL

Java applications communicate with MySQL through a JDBC driver. Spring Boot uses connection pooling and JPA to make this easier.

```
Spring Boot App
     ↓
MySQL JDBC Driver
     ↓
MySQL Server
     ↓
Database (food_ordering_db)
```

The JDBC URL tells the driver where the database is:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/food_ordering_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### Hibernate

Hibernate is the JPA implementation used by Spring Boot. It translates Java entities into database tables and SQL queries. With `spring.jpa.hibernate.ddl-auto=update`, Hibernate creates or updates tables automatically based on entity classes.

---

## How the technologies integrate

```
┌─────────────────────────────────┐
│  Angular Frontend (localhost:4200)│
│  - Browse menu, cart, orders    │
└──────────────┬──────────────────┘
               │ HTTP / REST / JSON
               ▼
┌─────────────────────────────────┐
│  Spring Boot Backend (port 8085)│
│  - Controllers, Services, JPA   │
└──────────────┬──────────────────┘
               │ JDBC
               ▼
┌─────────────────────────────────┐
│  Database (H2 dev / MySQL prod) │
└─────────────────────────────────┘
```

1. The Angular frontend sends HTTP requests to Spring Boot.
2. Spring Boot controllers receive the requests and call services.
3. Services use repositories to read or write data through JPA.
4. JPA/Hibernate communicates with H2 or MySQL.
5. The backend returns JSON responses to Angular.
6. Angular updates the UI using signals and components.

This separation of concerns makes the application easier to maintain, test, and scale.
