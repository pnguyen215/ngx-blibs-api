import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class NgxToasterService {

  abstract showSuccess(message: string, title: string): void;

  abstract showError(message: string, title: string): void;

  abstract showInfo(message: string, title: string): void;

  abstract showWarning(message: string, title: string): void;

  abstract update(message: string): void;

  abstract show(): void;

  abstract hide(): void;
}
