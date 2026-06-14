# User Guide — JumpStart Eats

This guide explains how to use the JumpStart Eats food ordering application.

## Home page

When you open the app, you land on the home page. It shows:

- A navigation bar with links to **Menu**, **Orders**, **About**, and a **Cart** icon.
- A hero section with a short intro and two buttons:
  - **Order Now** — takes you to the menu.
  - **See How It Works** — takes you to the about page.
- A **Browse Categories** section that lists food categories loaded from the backend.

## Browse the menu

1. Click **Menu** in the navigation bar or **Order Now** on the home page.
2. The menu page shows all available categories.
3. Click any category card (or its **Explore →** button) to filter menu items by that category.
4. The items list updates to show only food and drinks in that category.

## Add items to your cart

1. On the menu page, find an item you want.
2. Click **Add to Order**.
3. The cart icon in the navigation bar updates to show how many items are in the cart.
4. You can keep browsing and add more items.

## View and manage your cart

1. Click the **Cart** icon in the navigation bar.
2. The cart page lists every item you added, its quantity, and the line total.
3. Use the **+** and **−** buttons to change quantities.
4. Click **Remove** to remove an item completely.
5. Click **Clear Cart** to remove everything.

## Place an order

1. In the cart, review your items.
2. Click **Place Order**.
3. The cart is cleared and the order is saved to your order history.

## View your orders

1. Click **Orders** in the navigation bar.
2. The orders page shows every order you have placed, including:
   - Order number
   - Date and time
   - Items and quantities
   - Order total

## About the app

Click **About** to learn what JumpStart Eats is and how the ordering flow works.

## Tips

- If the category list does not load, make sure the Spring Boot backend is running on `http://localhost:8085`.
- Menu data is stored in the frontend for demo purposes. In a real app, it would come from the backend.
