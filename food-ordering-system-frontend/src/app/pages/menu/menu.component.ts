import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryListComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  category = signal<string | null>(null);
  items = signal<MenuItem[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const cat = params.get('category');
      this.category.set(cat);
      this.loadItems(cat);
    });
  }

  loadItems(category: string | null): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const request = category
      ? this.menuService.getItemsByCategory(category)
      : this.menuService.getItems();

    request.subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Could not load menu items. Is the backend running?');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  addToCart(item: MenuItem): void {
    this.cartService.addToCart(item);
  }
}
