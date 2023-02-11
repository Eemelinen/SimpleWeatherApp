import { Injectable, ErrorHandler } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  handleError(error: Error): void {
    this.snackBar.open('Something funky happened. Please try refreshing the page.', 'Close', {
      duration: 5000,
    });
  }
}
