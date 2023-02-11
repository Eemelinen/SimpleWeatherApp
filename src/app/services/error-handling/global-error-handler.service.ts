import { Injectable, ErrorHandler } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  handleError(error: Error): void {
    this.snackBar.open('Something funky happened. Let\'s keep moving.', 'Close', {
      duration: 5000,
    });
  }
}
