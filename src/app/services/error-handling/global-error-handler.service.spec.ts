import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandlerService,
        {
          provide: MatSnackBar,
          useValue: {
            open: () => 'Mat snackbar opened'
          }
        }
      ],
    });
    service = TestBed.inject(GlobalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snackbar if handleError is called', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    const spy = spyOn(snackBar, 'open');
    service.handleError(new Error('Test error'));
    expect(spy).toHaveBeenCalledTimes(1);
  })
});
