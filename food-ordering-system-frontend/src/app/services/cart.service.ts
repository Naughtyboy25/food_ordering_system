import { Injectable, computed, signal } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private orderHistory = signal<Order[]>([]);

  readonly items = this.cartItems.asReadonly();
  readonly orders = this.orderHistory.asReadonly();
  readonly total = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  readonly itemCount = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  addToCart(item: MenuItem): void {
    const current = this.cartItems();
    const existing = current.find(i => i.id === item.id);

    if (existing) {
      existing.quantity++;
      this.cartItems.set([...current]);
    } else {
      this.cartItems.set([...current, { ...item, quantity: 1 }]);
    }
  }

  increaseQuantity(itemId: number): void {
    const current = this.cartItems();
    const item = current.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
      this.cartItems.set([...current]);
    }
  }

  decreaseQuantity(itemId: number): void {
    const current = this.cartItems();
    const item = current.find(i => i.id === itemId);
    if (!item) return;

    if (item.quantity > 1) {
      item.quantity--;
      this.cartItems.set([...current]);
    } else {
      this.removeFromCart(itemId);
    }
  }

  removeFromCart(itemId: number): void {
    this.cartItems.set(this.cartItems().filter(i => i.id !== itemId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  placeOrder(): boolean {
    if (this.cartItems().length === 0) return false;

    const order: Order = {
      id: Date.now(),
      items: [...this.cartItems()],
      total: this.total(),
      orderedAt: new Date()
    };

    this.orderHistory.set([order, ...this.orderHistory()]);
    this.clearCart();
    return true;
  }
}
