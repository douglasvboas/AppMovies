import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class StarRatingComponent   {

  @Input() rating: number = 0; // Valor inicial da classificação
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5]; // Array para as 5 estrelas

  rate(rating: number) {
    this.rating = rating;
    this.ratingChange.emit(this.rating); // Emite o novo valor da classificação
  }
}