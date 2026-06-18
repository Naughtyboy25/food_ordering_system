# JumpStart Eats — Food Ordering System

A full-stack food ordering application built with **Spring Boot** and **Angular**.

- **Backend:** Spring Boot 3, Java 21, Spring Data JPA
- **Frontend:** Angular 17, standalone components, signals
- **Database:** H2 in development, MySQL in production

![JumpStart Eats](./images/hero.png)

## What it does

JumpStart Eats lets users browse food categories, view menu items, add them to a cart, and place orders. The Angular frontend talks to the Spring Boot backend through a REST API.

## Quick start

1. Start the backend:

   ```bash
   cd food-ordering-system-backend
   mvn spring-boot:run
   ```

2. Start the frontend:

   ```bash
   cd food-ordering-system-frontend
   bun install
   bun run start
   ```

3. Open `http://localhost:4200`.

## Endpoints

| Method | URL                       | Body         |
|--------|---------------------------|--------------|
| POST   | /api/categories           | { "name" }   |
| GET    | /api/categories           | -            |
| GET    | /api/categories/{id}      | -            |
| PUT    | /api/categories/{id}      | { "name" }   |
| DELETE | /api/categories/{id}      | -            |

> The controller also accepts `/api/category/*` so the existing Angular frontend keeps working.

## Documentation

- [User Guide](./docs/USER_GUIDE.md) — how the app works and how to use it
- [Developer Guide](./docs/DEVELOPER_GUIDE.md) — how to set up and run the project
- [Research](./docs/RESEARCH.md) — Spring Boot, Angular, MySQL, and how they integrate
- [Day 01 Research](./RESEARCH-DAY-01.md) — CRUD, HTTP methods, validation, and DTOs

## Repository structure

```
food_ordering_system/
├── food-ordering-system-backend/    # Spring Boot API
├── food-ordering-system-frontend/   # Angular app
├── docs/                            # User, developer, and research docs
├── images/                          # Screenshots and assets
├── README.md                        # You are here
└── .gitignore                       # Files to ignore in version control
```

## License

This project is for educational purposes.
