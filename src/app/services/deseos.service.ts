import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
	
	listas:Lista[] = [];

	constructor() {
		this.cargarStorage();
	}

	crearLista(titulo:string){
		const nuevaLista = new Lista(titulo);
		this.listas.push(nuevaLista);
		this.guardarStorage();
		return nuevaLista.id;
	}

	obtenerLista(id:string | number){
		id = Number(id);
		return this.listas.find( listaData => listaData.id === id );
	}

	guardarStorage(){
		localStorage.setItem('data', JSON.stringify(this.listas));
	}

	cargarStorage(){
		let localdata = localStorage.getItem('data');
		if (localdata) {
			this.listas = JSON.parse( localdata );
		}
	}

	borrarLista(lista:Lista){
		this.listas = this.listas.filter(elemento => elemento.id !== lista.id);
		this.guardarStorage();
	}

}
