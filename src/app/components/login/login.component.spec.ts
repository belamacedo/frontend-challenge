import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceMock = {
    login: jest.fn((email: string, password: string) => {
      if (email === 'usuario@gmail.com' && password === 'usuario') {
        return of(true);
      } else {
        return of(false);
      }
    }),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        LoginComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit when the form is submitted', () => {
    jest.spyOn(component, 'onSubmit');
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call AuthService.login and navigate on successful login', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.loginForm.setValue({
      email: 'usuario@gmail.com',
      password: 'usuario',
    });
    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith(
      'usuario@gmail.com',
      'usuario'
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not navigate on failed login', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.loginForm.setValue({
      email: 'wronguser@gmail.com',
      password: 'wrongpassword',
    });
    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith(
      'wronguser@gmail.com',
      'wrongpassword'
    );
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
