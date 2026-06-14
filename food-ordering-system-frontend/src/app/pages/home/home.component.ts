import { Component } from '@angular/core';
import { CategoryListComponent } from '../../components/category-list/category-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'JumpStart Eats';
}
