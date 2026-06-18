import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

/**
 * MenuService fetches and manages menu items from the Spring Boot backend.
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'http://localhost:8085/api/menu-items';

  constructor(private http: HttpClient) {}

  /** GET /api/menu-items */
  getItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  /** GET /api/menu-items/category/{categoryName} */
  getItemsByCategory(category: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/category/${encodeURIComponent(category)}`);
  }

  /** POST /api/menu-items */
  createItem(item: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, item);
  }

  /** PUT /api/menu-items/{id} */
  updateItem(id: number, item: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}/${id}`, item);
  }

  /** DELETE /api/menu-items/{id} */
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
