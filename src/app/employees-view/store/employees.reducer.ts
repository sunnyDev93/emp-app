import { createReducer, on } from '@ngrx/store';
import { addEmployee, loadEmployeesSuccess, updateEmployee } from './employees.actions';

export const initialState: any[] = [];

export const employeesReducer = createReducer(
  initialState,
  on(loadEmployeesSuccess, (state, { employees }) => employees || []),
  on(updateEmployee, (state, { employee }) =>
    state.map((e) => (e.id === employee.id ? employee : e))
  ),
  on(addEmployee, (state, { employee }) => [...state, employee]),
);