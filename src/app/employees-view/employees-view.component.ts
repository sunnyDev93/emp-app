import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { addEmployee, loadEmployees, updateEmployee } from './store/employees.actions';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.interface';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css'],
  imports: [MatTableModule, CommonModule]
})
export class EmployeesViewComponent implements OnInit {
  employees$: Observable<Employee[]>;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'age',
    'city',
    'street',
    'department',
    'actions',
  ];

  constructor(private store: Store<{ employees: Employee[] }>, private dialog: MatDialog) {
    this.employees$ = this.store.select('employees').pipe(
      map((employees) => employees || [])
    ) || [];
  }

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());
  }

  openEditDialog(employee: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
      
      if (result) {
        this.store.dispatch(updateEmployee({ employee: result }));
      }
    });
  }

}