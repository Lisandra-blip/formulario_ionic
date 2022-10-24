import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , ReactiveFormsModule
  ],
  declarations: [FormularioComponent]
})
export class FormularioModule { }
