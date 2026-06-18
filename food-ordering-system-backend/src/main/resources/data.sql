-- Seed data loaded automatically by Spring Boot on startup (H2 / dev mode)
-- This inserts the four required categories into the category table.

INSERT INTO category (name) VALUES ('Fast Food');
INSERT INTO category (name) VALUES ('Pizza');
INSERT INTO category (name) VALUES ('Drinks');
INSERT INTO category (name) VALUES ('Desserts');

-- Sample menu items for each category
INSERT INTO menu_item (name, category, description, price) VALUES ('Classic Cheeseburger', 'Fast Food', 'Beef patty, cheddar, lettuce, tomato', 8.99);
INSERT INTO menu_item (name, category, description, price) VALUES ('Crispy Fries', 'Fast Food', 'Golden fried potato fries', 3.99);
INSERT INTO menu_item (name, category, description, price) VALUES ('Margherita Pizza', 'Pizza', 'Tomato sauce, mozzarella, basil', 10.99);
INSERT INTO menu_item (name, category, description, price) VALUES ('Pepperoni Pizza', 'Pizza', 'Spicy pepperoni & mozzarella', 12.99);
INSERT INTO menu_item (name, category, description, price) VALUES ('Cola', 'Drinks', 'Chilled 330ml can', 1.99);
INSERT INTO menu_item (name, category, description, price) VALUES ('Milkshake', 'Drinks', 'Creamy vanilla milkshake', 4.49);
INSERT INTO menu_item (name, category, description, price) VALUES ('Chocolate Cake', 'Desserts', 'Rich chocolate layer cake', 5.99);
INSERT INTO menu_item (name, category, description, price) VALUES ('Ice Cream Sundae', 'Desserts', 'Vanilla ice cream with toppings', 4.99);
