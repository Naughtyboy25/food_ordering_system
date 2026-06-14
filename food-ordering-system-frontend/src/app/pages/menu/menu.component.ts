import { Component, OnInit, computed, signal } from '@angular/core';
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
  items = computed(() => {
    const cat = this.category();
    return cat ? this.menuService.getItemsByCategory(cat) : this.menuService.getItems();
  });

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.category.set(params.get('category'));
    });
  }

  addToCart(item: MenuItem): void {
    this.cartService.addToCart(item);
  }
}
