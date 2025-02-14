import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import * as EmployeeActions from './employees.actions';

@Injectable()
export class EmployeesEffects {
  private readonly actions$ = inject(Actions);
  private readonly employeeService = inject(EmployeeService);
  private readonly store = inject(Store);

  loadEmployees$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      switchMap(() => {
        return this.employeeService.getEmployees().pipe(
          map(employees => EmployeeActions.loadEmployeesSuccess({ employees })),
          catchError(error => {
            console.error('Error in effect:', error);
            return of({ type: '[Employees] Load Employees Failed' });
          })
        );
      })
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      switchMap(({ employee }) => 
        this.employeeService.updateEmployee(employee).pipe(
          map(() => ({ type: '[Employees] Update Employee Success' })),
          catchError(() => of({ type: '[Employees] Update Employee Failed' }))
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      switchMap(({ employee }) =>
        this.employeeService.addEmployee(employee).pipe(
          map(() => ({ type: '[Employees] Add Employee Success' })),
          catchError((error) => {
            console.error('Error adding employee:', error);
            return of({ type: '[Employees] Add Employee Failed', error: error.message });
          })
        )
      )
    )
  );
}