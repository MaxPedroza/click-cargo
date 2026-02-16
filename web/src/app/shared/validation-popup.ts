import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cc-validation-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cc-validation-backdrop" *ngIf="visible">
      <div class="cc-validation-dialog">
        <h3 class="cc-validation-title">{{ title || 'Por favor, revise os campos obrigatórios' }}</h3>
        <p class="cc-validation-text" *ngIf="description">
          {{ description }}
        </p>
        <ul class="cc-validation-list">
          <li *ngFor="let msg of messages">{{ msg }}</li>
        </ul>
        <button type="button" class="cc-validation-button" (click)="close()">
          Ok, vou corrigir
        </button>
      </div>
    </div>
  `,
  styles: `
    .cc-validation-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .cc-validation-dialog {
      max-width: 420px;
      width: 90%;
      background: var(--cc-surface, #ffffff);
      border-radius: 18px;
      padding: 20px 22px 18px;
      box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);
      border: 1px solid rgba(59, 130, 246, 0.3);
      font-size: 0.9rem;
    }
    .cc-validation-title {
      margin: 0 0 6px;
      font-size: 1rem;
      color: #0f172a;
    }
    .cc-validation-text {
      margin: 0 0 8px;
      color: #4b5563;
      font-size: 0.85rem;
    }
    .cc-validation-list {
      margin: 0 0 12px 18px;
      padding: 0;
      color: #111827;
      font-size: 0.9rem;
    }
    .cc-validation-list li::marker {
      color: var(--cc-blue, #1d4ed8);
    }
    .cc-validation-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 18px;
      border-radius: 999px;
      border: none;
      background: var(--cc-blue, #1d4ed8);
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }
    .cc-validation-button:hover {
      background: #1d4ed8;
      filter: brightness(0.95);
    }
  `,
})
export class ValidationPopupComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() description = '';
  @Input() messages: string[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
