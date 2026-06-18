import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

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

  constructor(private categoryService: CategoryService) {}

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
}
