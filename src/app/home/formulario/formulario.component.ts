import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public formulario: FormGroup;

  public idOutro: boolean = false;

  constructor( public form: FormBuilder, private enderecoService: EnderecoService ) {

    this.formulario = form.group({
        nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
      , sobrenome: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
      , CPF: ['',Validators.compose([Validators.required, verificaCPF()])]
      , CEP: [null, Validators.pattern('\[0-9]{5}-\[0-9]{3}')] // opcional :  Validators.pattern('\[0-9]{5}-?\[0-9]{3}')
      , rua: ['']
      , bairro: ['']
      , cidade: ['']
      , estado: ['']
      , genero: ['',Validators.required]
      , outroGenero: ['']
    });

  }

  ngOnInit() {
    this.formulario.patchValue({ genero: 'naoInformado' }, {emitEvent: true});
  }

  public verificaGenero(event) {

    event == 'outro' ? this.idOutro = true : this.idOutro = false;

    this.formulario.controls["outroGenero"].setValidators([Validators.required])
    this.formulario.controls["outroGenero"].updateValueAndValidity()
    this.formulario.controls["outroGenero"].markAsTouched();
  }

  public verificaCep(event) {

    const CEP = this.formulario.getRawValue().CEP;

    if (CEP) {

      this.enderecoService.verificaCep(CEP).subscribe((dados: any) => {

        this.formulario.patchValue({
          rua: dados.logradouro
          , complemento: dados.complemento
          , bairro: dados.bairro
          , cidade: dados.localidade
          , estado: dados.uf
        });

      });
    }

  }

  enviar() {

    console.log(this.formulario.getRawValue());

    if (!this.formulario.valid) {
        this.formulario.markAllAsTouched();
    }

  }

}

export function verificaCPF(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let cpf = control.value;

    //opcional
    //const regex = new RegExp('\[0-9]{3}.?\[0-9]{3}.?\[0-9]{3}-?\[0-9]{2}');
    //obrigatorio
    const regex = new RegExp('\[0-9]{3}.\[0-9]{3}.\[0-9]{3}-\[0-9]{2}');

    return regex.test(cpf) ? null : {CPFVallidator: true}

  };
}
