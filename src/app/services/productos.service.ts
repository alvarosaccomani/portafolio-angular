import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable()
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise ((resolve, reject) => {
      this.http.get('https://angular-html-ece5d.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
    
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-ece5d.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0){
      //Cargar productos
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);
      });
    } else {
      //Aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino:string) {
    this.productosFiltrado=[];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {
      const categoriaLower = prod.categoria.toLowerCase();
      const tituloLower = prod.titulo.toLowerCase();
      const codLower = prod.cod.toLocaleLowerCase();
      
      if( categoriaLower.indexOf(termino) >= 0 
          || tituloLower.indexOf(termino) >= 0 
          || codLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push( prod );
      }
    });
  }

}
