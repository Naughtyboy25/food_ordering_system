import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

/**
 * CategoryService is responsible for communicating with the Spring Boot backend.
 * It uses Angular's HttpClient to make HTTP requests to the REST API.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Base URL of the Spring Boot backend API
  private apiUrl = 'http://localhost:8085/api/category';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all food categories from the backend.
   * Returns an Observable of Category array.
   */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
