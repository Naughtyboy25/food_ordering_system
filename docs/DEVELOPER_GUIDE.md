# Developer Guide — JumpStart Eats

This guide explains how to set up, run, and work on the project as a developer.

## Prerequisites

- **Java 21** or later
- **Maven 3.9+**
- **Node.js 18+** and **Bun** (or npm)
- **Angular CLI 17** (`npm install -g @angular/cli`)
- **MySQL 8+** (optional — H2 is used by default for development)

## Project structure

```
food_ordering_system/
├── food-ordering-system-backend/     # Spring Boot API
│   ├── src/main/java/com/jumpstart/foodorderingsystem/
│   │   ├── controller/              # REST controllers
│   │   ├── service/                 # Business logic
│   │   ├── repository/              # Spring Data JPA repositories
│   │   ├── entity/                  # JPA entities
│   │   ├── dto/                     # Data Transfer Objects
│   │   ├── config/                  # Configuration classes
│   │   └── exception/               # Custom exceptions
│   └── src/main/resources/
│       ├── application.properties   # App configuration
│       └── data.sql                 # Seed data
├── food-ordering-system-frontend/    # Angular app
│   ├── src/app/
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Route-level pages
│   │   ├── services/                # HTTP and state services
│   │   └── models/                  # TypeScript interfaces
│   └── proxy.conf.json              # Dev proxy to backend
└── docs/                             # Documentation
```

## Run the backend

### Using H2 (default, no MySQL needed)

```bash
cd food-ordering-system-backend
mvn spring-boot:run
```

The backend runs on `http://localhost:8085`.

Test it:

```bash
curl http://localhost:8085/api/category
```

You can also open the H2 console at `http://localhost:8085/h2-console`.

### Using MySQL

1. Create a MySQL database:

   ```sql
   CREATE DATABASE food_ordering_db;
   ```

2. In `application.properties`, switch the active profile or update the datasource block with your MySQL credentials.
3. Run the backend again.

> **Security note:** Do not commit `application.properties` if it contains passwords. It is listed in the root `.gitignore`.

## Run the frontend

```bash
cd food-ordering-system-frontend
bun install
bun run start
```

The frontend runs on `http://localhost:4200` and proxies API calls to `http://localhost:8085` using `proxy.conf.json`.

If you use npm instead of Bun:

```bash
npm install
ng serve --proxy-config proxy.conf.json
```

## Build for production

### Backend

```bash
cd food-ordering-system-backend
mvn clean package
```

The JAR is created in `target/`.

### Frontend

```bash
cd food-ordering-system-frontend
bun run build
```

The production build is created in `dist/food-ordering-frontend/`.

## CORS

The Angular dev server proxies `/api` requests to the backend, so CORS is not an issue during development. If you deploy the frontend and backend separately, enable CORS on the backend:

```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/category")
public class CategoryController { ... }
```

## API endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/category` | List all categories |
| GET | `/api/category/{id}` | Get one category by ID |

## Environment notes

- Backend port: `8085`
- Frontend port: `4200`
- H2 console: `http://localhost:8085/h2-console`
- H2 JDBC URL: `jdbc:h2:mem:food_ordering_db`

## Git ignore

The root `.gitignore` prevents build artifacts, dependencies, IDE files, and sensitive configuration from being committed. See `.gitignore` for the full list.
