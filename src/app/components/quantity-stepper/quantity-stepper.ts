import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-stepper',
  standalone: true,
  templateUrl: './quantity-stepper.html',
  styleUrl: './quantity-stepper.css',
})
export class QuantityStepper {
  value = input.required<number>();
  min = input<number>(1);
  max = input<number>(99);
  valueChange = output<number>();

  inc(): void {
    const next = Math.min(this.value() + 1, this.max());
    if (next !== this.value()) this.valueChange.emit(next);
  }

  dec(): void {
    const next = Math.max(this.value() - 1, this.min());
    if (next !== this.value()) this.valueChange.emit(next);
  }
}
