import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable()
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean = false;

  equipo: any[] = [];


  constructor( private http: HttpClient) { 
     this.cargarInfo();
     this.cargarEquipo();
  }

  private cargarInfo() {
    console.log('Info de servicio Pagina cargada');
    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
             .subscribe( (resp: InfoPagina) => {

                this.cargada = true
                this.info = resp;
                
             });
  }

  private cargarEquipo() {
    console.log('Info de servicio Pagina cargada');
    //Leer el archivo JSON
    this.http.get('https://angular-html-ece5d.firebaseio.com/equipo.json')
             .subscribe( (resp: any) => {
                
                this.equipo = resp;
                
             });
  }

}
