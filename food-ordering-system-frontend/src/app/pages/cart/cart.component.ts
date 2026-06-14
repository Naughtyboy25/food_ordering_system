import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  increase(item: CartItem): void {
    this.cartService.increaseQuantity(item.id);
  }

  decrease(item: CartItem): void {
    this.cartService.decreaseQuantity(item.id);
  }

  remove(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
  }

  clear(): void {
    this.cartService.clearCart();
  }

  placeOrder(): void {
    this.cartService.placeOrder();
  }
}
