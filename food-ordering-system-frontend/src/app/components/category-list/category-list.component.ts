import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

/**
 * CategoryListComponent fetches and displays all food categories.
 * It uses CategoryService to retrieve data from the Spring Boot API.
 */
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  isLoading = true;
  errorMessage = '';

  // Map category names to icons and accent colors
  categoryMeta: { [key: string]: { icon: string; color: string; description: string } } = {
    'Fast Food': { icon: '🍔', color: '#F5A623', description: 'Burgers, fries & quick bites' },
    'Pizza':     { icon: '🍕', color: '#E85D4A', description: 'Wood-fired & classic pies' },
    'Drinks':    { icon: '🥤', color: '#4CAF50', description: 'Refreshing beverages & shakes' },
    'Desserts':  { icon: '🍰', color: '#9B59B6', description: 'Sweet treats & indulgences' },
  };

  defaultMeta = { icon: '🍽️', color: '#F5A623', description: 'Explore this category' };

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not reach the server. Make sure your Spring Boot app is running on port 8085.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  getMeta(name: string) {
    return this.categoryMeta[name] || this.defaultMeta;
  }

  onExplore(category: Category, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/menu'], { queryParams: { category: category.name } });
  }

  onCardClick(category: Category): void {
    this.router.navigate(['/menu'], { queryParams: { category: category.name } });
  }
}
