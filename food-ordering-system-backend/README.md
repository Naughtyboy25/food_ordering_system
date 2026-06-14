# Food Ordering System — Spring Boot Backend

**Group:** com.jumpstart  
**Artifact:** food-ordering-system  
**Java Version:** 21  
**Port:** 8085

---

## Quick Start

```bash
# Run with H2 in-memory DB (no MySQL needed)
mvn spring-boot:run

# Test the API
curl http://localhost:8085/api/category

# View the in-memory database
http://localhost:8085/h2-console
# JDBC URL: jdbc:h2:mem:food_ordering_db
```

To use MySQL instead, uncomment the MySQL block in `application.properties` and comment out the H2 block.

---

## Research Questions

### 1. What is Spring Boot?
Spring Boot is a framework built on top of the Spring Framework that makes it easier to create stand-alone, production-ready Java applications. It removes most of the manual configuration that the traditional Spring Framework required. Instead of writing XML configuration files, Spring Boot uses sensible defaults ("convention over configuration") and auto-configures the application based on the dependencies you add. You add a dependency like `spring-boot-starter-web` and Spring Boot automatically sets up an embedded Tomcat server, a DispatcherServlet, and JSON support — ready to go with no extra setup.

### 2. What is Maven?
Maven is a build automation and project management tool for Java projects. It handles three main things: compiling source code, managing dependencies (downloading the correct libraries from the internet), and packaging the application into a deployable file (a `.jar` or `.war`). Maven uses a `pom.xml` file as its configuration file. Before Maven, developers had to manually download libraries and add them to the project's classpath. Maven automates this completely.

### 3. What is the purpose of pom.xml?
`pom.xml` (Project Object Model) is the heart of a Maven project. It defines:
- **Project identity** — the `groupId`, `artifactId`, and `version` that uniquely identify this project
- **Parent** — which parent POM to inherit from (in our case, `spring-boot-starter-parent` which provides sensible defaults)
- **Dependencies** — the libraries this project needs (Spring Web, JPA, MySQL Driver, Lombok, H2)
- **Build plugins** — tools that run during the build process (like the Spring Boot Maven plugin that packages the app as a fat JAR)
- **Java version** — which version of Java to compile with

### 4. What is the purpose of application.properties?
`application.properties` is Spring Boot's main configuration file. It controls the runtime behaviour of the application without changing any code. Common settings include:
- `server.port` — which port the app listens on
- `spring.datasource.url` — where the database is
- `spring.datasource.username` / `password` — database credentials
- `spring.jpa.hibernate.ddl-auto` — whether Hibernate creates/updates/drops tables automatically
- `spring.jpa.show-sql` — whether to print SQL statements to the console

This separation of configuration from code means you can deploy the same JAR to different environments (development, testing, production) with different properties files.

### 5. What does @SpringBootApplication do?
`@SpringBootApplication` is a convenience annotation that combines three annotations into one:
- **`@Configuration`** — marks the class as a source of bean definitions for the Spring container
- **`@EnableAutoConfiguration`** — tells Spring Boot to automatically configure the application based on the dependencies on the classpath (e.g. if H2 is on the classpath, set up an in-memory datasource)
- **`@ComponentScan`** — tells Spring to scan the current package and all sub-packages for classes annotated with `@Component`, `@Service`, `@Repository`, `@Controller`, etc. and register them as Spring-managed beans

### 6. Why do developers use dependency management tools such as Maven?
Without a dependency manager, you would need to:
1. Manually find and download every library (JAR file) your project needs
2. Manually download all the libraries *those* libraries need (transitive dependencies)
3. Keep track of version compatibility between all libraries
4. Re-do all of this whenever you update a library

Maven solves all of this. You declare what you need in `pom.xml` and Maven resolves, downloads, and caches everything automatically. It also ensures that every developer on a team and every CI/CD server uses the exact same library versions, preventing "it works on my machine" problems. It also standardises the project structure so any Maven project looks familiar to any Java developer.

### 7. What is a REST API?
REST (Representational State Transfer) is an architectural style for building web APIs. A REST API exposes resources (data like categories, users, orders) over HTTP using standard methods:
- **GET** — read data (e.g. `GET /api/category` fetches all categories)
- **POST** — create data
- **PUT / PATCH** — update data
- **DELETE** — remove data

REST APIs communicate using standard HTTP, which means any client — a browser, a mobile app, an Angular frontend — can call them. Responses are typically JSON. Our endpoint `http://localhost:8085/api/category` is a REST endpoint.

### 8. What is JSON?
JSON (JavaScript Object Notation) is a lightweight, text-based data format used to exchange data between systems. It represents data as key-value pairs:
```json
{
  "id": 1,
  "name": "Fast Food"
}
```
An array of objects:
```json
[
  { "id": 1, "name": "Fast Food" },
  { "id": 2, "name": "Pizza" }
]
```
JSON is language-independent — Java, JavaScript, Python, and virtually every other language can parse and produce it. In Spring Boot, `@RestController` automatically converts Java objects to JSON using the Jackson library.

### 9. What is Dependency Injection?
Dependency Injection (DI) is a design pattern where an object receives the other objects it depends on (its "dependencies") from an external source, rather than creating them itself. In Spring Boot:

```java
// Without DI — the class creates its own dependency (tightly coupled)
public class CategoryController {
    private CategoryService service = new CategoryServiceImpl(); // ❌ hard-coded
}

// With DI — Spring injects the dependency (loosely coupled)
@RestController
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service; // ✅ Spring provides this
}
```

Spring Boot's IoC (Inversion of Control) container manages the creation and wiring of all beans. This makes the code easier to test (you can inject a mock service), easier to swap implementations, and cleaner to read.

---

## Package Structure

| Package | Purpose |
|---|---|
| `controller` | Handles incoming HTTP requests. Receives input, delegates to the service, and returns HTTP responses (JSON). The "front door" of the application. |
| `service` | Contains the business logic. Coordinates between the controller and the repository. Contains interfaces and their implementations. |
| `repository` | Data access layer. Communicates with the database using Spring Data JPA. |
| `entity` | JPA entities — Java classes that map directly to database tables. |
| `dto` | Data Transfer Objects — plain classes used to transfer data between layers without exposing internal entity details. |
| `config` | Spring configuration classes annotated with `@Configuration`. Holds app-wide settings like CORS config. |
| `exception` | Custom exception classes and a global exception handler that formats error responses. |

---

## API Endpoints

| Method | URL | Description |
|---|---|---|
| GET | `/api/category` | Returns all categories |
| GET | `/api/category/{id}` | Returns a single category by ID |

---

## Data Flow

```
HTTP Request
     ↓
CategoryController   (routes the request, returns JSON)
     ↓
CategoryService      (business logic, entity → DTO mapping)
     ↓
CategoryRepository   (JPA queries the database)
     ↓
Database (H2 / MySQL)
```
