import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MenuService } from '../../services/menu.service';
import { Category } from '../../models/category.model';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  formCategory: Category = { id: 0, name: '' };
  isEditing = false;
  formError = '';

  // Menu item management
  selectedCategory: Category | null = null;
  menuItems: MenuItem[] = [];
  itemsLoading = false;
  itemError = '';
  itemSuccess = '';
  itemForm: MenuItem = { id: 0, name: '', category: '', description: '', price: 0 };

  constructor(
    private categoryService: CategoryService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load categories. Is the backend running on port 8085?';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(form: any): void {
    if (form.invalid) {
      this.formError = 'Category name must be 2–50 characters.';
      return;
    }

    this.formError = '';
    const category: Category = { id: this.formCategory.id, name: this.formCategory.name.trim() };

    if (this.isEditing && category.id) {
      this.categoryService.updateCategory(category.id, category).subscribe({
        next: () => {
          this.successMessage = `Category "${category.name}" updated.`;
          this.resetForm();
          this.loadCategories();
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.categoryService.createCategory(category).subscribe({
        next: () => {
          this.successMessage = `Category "${category.name}" created.`;
          this.resetForm();
          this.loadCategories();
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  editCategory(category: Category): void {
    this.formCategory = { ...category };
    this.isEditing = true;
    this.formError = '';
    this.successMessage = '';
  }

  deleteCategory(id: number, name: string): void {
    if (!confirm(`Delete category "${name}"?`)) {
      return;
    }

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.successMessage = `Category "${name}" deleted.`;
        if (this.selectedCategory?.id === id) {
          this.selectedCategory = null;
          this.menuItems = [];
        }
        this.loadCategories();
      },
      error: (err) => this.handleError(err)
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.formCategory = { id: 0, name: '' };
    this.isEditing = false;
    this.formError = '';
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.itemSuccess = '';
    this.itemError = '';
  }

  // ── Menu item management ─────────────────────────

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.itemForm = { id: 0, name: '', category: category.name, description: '', price: 0 };
    this.itemError = '';
    this.itemSuccess = '';
    this.loadMenuItems(category.name);
  }

  loadMenuItems(categoryName: string): void {
    this.itemsLoading = true;
    this.menuService.getItemsByCategory(categoryName).subscribe({
      next: (data) => {
        this.menuItems = data;
        this.itemsLoading = false;
      },
      error: (err) => {
        this.itemError = 'Could not load menu items.';
        this.itemsLoading = false;
        console.error(err);
      }
    });
  }

  onItemSubmit(form: any): void {
    if (form.invalid || !this.selectedCategory) {
      this.itemError = 'Please provide a valid name, description, and price.';
      return;
    }

    this.itemError = '';
    const item: MenuItem = {
      id: 0,
      name: this.itemForm.name.trim(),
      category: this.selectedCategory.name,
      description: this.itemForm.description.trim(),
      price: this.itemForm.price
    };

    this.menuService.createItem(item).subscribe({
      next: () => {
        this.itemSuccess = `Item "${item.name}" added.`;
        this.itemForm.name = '';
        this.itemForm.description = '';
        this.itemForm.price = 0;
        this.loadMenuItems(this.selectedCategory!.name);
      },
      error: (err) => this.handleItemError(err)
    });
  }

  deleteMenuItem(id: number, name: string): void {
    if (!confirm(`Delete item "${name}"?`)) {
      return;
    }

    this.menuService.deleteItem(id).subscribe({
      next: () => {
        this.itemSuccess = `Item "${name}" deleted.`;
        if (this.selectedCategory) {
          this.loadMenuItems(this.selectedCategory.name);
        }
      },
      error: (err) => this.handleItemError(err)
    });
  }

  private handleError(err: any): void {
    if (err.error?.fieldErrors?.name) {
      this.formError = err.error.fieldErrors.name;
    } else if (err.error?.message) {
      this.formError = err.error.message;
    } else {
      this.formError = 'Something went wrong. Please try again.';
    }
    console.error(err);
  }

  private handleItemError(err: any): void {
    if (err.error?.fieldErrors) {
      const messages = Object.values(err.error.fieldErrors).join(', ');
      this.itemError = messages;
    } else if (err.error?.message) {
      this.itemError = err.error.message;
    } else {
      this.itemError = 'Something went wrong. Please try again.';
    }
    console.error(err);
  }
}
