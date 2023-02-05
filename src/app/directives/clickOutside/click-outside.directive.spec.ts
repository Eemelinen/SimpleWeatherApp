import { ClickOutsideDirective } from './click-outside.directive';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      ElementRef,
    ],
  });
});

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    pending();
    const directive = new ClickOutsideDirective(new ElementRef<any>(null));
    expect(directive).toBeTruthy();
  });
});
