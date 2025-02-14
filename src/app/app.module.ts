import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeesViewComponent } from './employees-view/employees-view.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

import { StoreModule } from '@ngrx/store';
import { employeesReducer } from './employees-view/store/employees.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeesEffects } from './employees-view/store/employees.effects';
import { EmployeeService } from './services/employee.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ employees: employeesReducer }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([EmployeesEffects]),
    MatTableModule,
    EmployeesViewComponent,
    EditDialogComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    EmployeeService,
    EmployeesEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
