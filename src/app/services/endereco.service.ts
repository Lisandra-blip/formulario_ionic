import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }


  verificaCep(CEP) {
    CEP.replace('-','')

    return this.http.get(`//viacep.com.br/ws/${CEP}/json`);

  }
}
