import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private items: MenuItem[] = [
    { id: 1, name: 'Classic Cheeseburger', category: 'Fast Food', price: 8.99, description: 'Beef patty, cheddar, lettuce, tomato' },
    { id: 2, name: 'Crispy Fries', category: 'Fast Food', price: 3.99, description: 'Golden fried potato fries' },
    { id: 3, name: 'Chicken Nuggets', category: 'Fast Food', price: 6.49, description: '10 pcs crispy nuggets' },

    { id: 4, name: 'Margherita Pizza', category: 'Pizza', price: 10.99, description: 'Tomato sauce, mozzarella, basil' },
    { id: 5, name: 'Pepperoni Pizza', category: 'Pizza', price: 12.99, description: 'Spicy pepperoni & mozzarella' },
    { id: 6, name: 'Veggie Pizza', category: 'Pizza', price: 11.49, description: 'Bell peppers, olives, mushrooms' },

    { id: 7, name: 'Cola', category: 'Drinks', price: 1.99, description: 'Chilled 330ml can' },
    { id: 8, name: 'Orange Juice', category: 'Drinks', price: 2.49, description: 'Freshly squeezed orange juice' },
    { id: 9, name: 'Milkshake', category: 'Drinks', price: 4.49, description: 'Creamy vanilla milkshake' },

    { id: 10, name: 'Chocolate Cake', category: 'Desserts', price: 5.99, description: 'Rich chocolate layer cake' },
    { id: 11, name: 'Ice Cream Sundae', category: 'Desserts', price: 4.99, description: 'Vanilla ice cream with toppings' },
    { id: 12, name: 'Apple Pie', category: 'Desserts', price: 5.49, description: 'Warm apple pie with cinnamon' },
  ];

  getItems(): MenuItem[] {
    return [...this.items];
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.items.filter(item => item.category === category);
  }
}
