# Food Ordering System — Angular Frontend

Angular 17 frontend for the `food-ordering-system` Spring Boot project.

## Stack

- **Angular 17** (standalone components)
- **TypeScript**
- **RxJS** — reactive HTTP calls via `HttpClient`
- **Angular Signals** — reactive state in `CartService`

## Project Structure

```
src/app/
├── components/
│   └── category-list/          # Displays food categories from the API
├── pages/
│   ├── home/                   # Landing page with hero and categories
│   ├── menu/                   # Browse categories and menu items
│   ├── cart/                   # Cart management and checkout
│   ├── orders/                 # Order history
│   └── about/                  # App information
├── services/
│   ├── category.service.ts     # Calls GET /api/category
│   ├── menu.service.ts         # Mock menu items
│   └── cart.service.ts         # Cart and order state
├── models/                     # TypeScript interfaces
├── app.component.*             # Root shell (nav, router outlet, footer)
├── app.config.ts               # App-wide providers
└── app.routes.ts               # Route definitions
```

## Prerequisites

- Node.js 18+
- Angular CLI 17: `npm install -g @angular/cli`
- Spring Boot backend running on `http://localhost:8085`
- Bun (recommended) or npm

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server (with proxy to avoid CORS)
bun run start

# Open browser
http://localhost:4200
```

If you use npm:

```bash
npm install
ng serve --proxy-config proxy.conf.json
```

## API Connection

The app calls:

```
GET /api/category
```

The Angular dev server proxies `/api` requests to `http://localhost:8085`.

Expected response:

```json
[
  { "id": 1, "name": "Fast Food" },
  { "id": 2, "name": "Pizza" },
  { "id": 3, "name": "Drinks" },
  { "id": 4, "name": "Desserts" }
]
```

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/menu` | Menu with categories and items |
| `/menu?category=Pizza` | Filtered menu |
| `/cart` | Cart |
| `/orders` | Order history |
| `/about` | About the app |

## Build

```bash
bun run build
```

Output goes to `dist/food-ordering-frontend/`.

## CORS (Backend Fix)

Add this to your Spring Boot `CategoryController` if you deploy the frontend separately:

```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/category")
public class CategoryController { ... }
```

During development, the proxy handles CORS for you.
