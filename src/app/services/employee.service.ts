import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EMPLOYEE_MOCK_DATA } from '../mock/employee.mock';
import { Employee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees = [...EMPLOYEE_MOCK_DATA];

  getEmployees() {
    return of(this.employees);
  }

  updateEmployee(employee: Employee) {
    const index = this.employees.findIndex((e) => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
    }
    return of(employee);
  }

  addEmployee(employee: Employee) {
    if (!employee.id) {
      employee = { ...employee, id: this.generateUniqueId() };
    }

    const employeeExists = this.employees.some((e) => e.id === employee.id);
    if (employeeExists) {
      throw new Error('Employee with this ID already exists');
    }
    const updatedEmployees = [...this.employees, employee];
    this.employees = updatedEmployees;
    return of(employee);
  }

  private generateUniqueId(): number {
    const maxId = this.employees.reduce((max, e) => (e.id > max ? e.id : max), 0);
    return maxId + 1;
  }
}