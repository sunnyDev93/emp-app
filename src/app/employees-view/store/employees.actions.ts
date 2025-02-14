import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.interface';

export const loadEmployees = createAction('[Employees] Load Employees');
export const loadEmployeesSuccess = createAction(
  '[Employees] Load Employees Success',
  props<{ employees: Employee[] }>()
);
export const updateEmployee = createAction(
  '[Employees] Update Employee',
  props<{ employee: Employee }>()
);

export const addEmployee = createAction(
  '[Employees] Add Employee',
  props<{ employee: Employee }>()
)

export function updateEmployeeSuccess(arg0: { employee: unknown; }): any {
  throw new Error('Function not implemented.');
}
