import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable()
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean = false;


  constructor( private http: HttpClient) { 
    console.log('Info de servicio Pagina cargada');
    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
             .subscribe( (resp: InfoPagina) => {

                this.cargada = true
                this.info = resp;
                console.log(resp);
             }); 
  }

}
