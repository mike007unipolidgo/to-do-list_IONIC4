import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

	listaId:any;
	lista:Lista;
	nombreItem = '';

	constructor(
	private deseosService:DeseosService,
	private activatedRoute:ActivatedRoute
	) {
		this.listaId = this.activatedRoute.snapshot.paramMap.get('listaId');	  
	}
  
	ngOnInit() {
		this.lista = this.deseosService.obtenerLista(this.listaId);
	}

	agregarItem(){
		if (this.nombreItem.length === 0){
			return;
		}
		const nuevoItem = new ListaItem(this.nombreItem);
		this.lista.items.push(nuevoItem);
		this.nombreItem = '';
		this.deseosService.guardarStorage();
	}

	cambioCheck(){
		const pendientes = this.lista.items
			.filter( itemData => !itemData.completado ).length;
		if (pendientes === 0) {
			this.lista.completada = true;
			this.lista.terminadaEn = new Date();
		} else {
			this.lista.completada = false;
			this.lista.terminadaEn = null;
		}
		this.deseosService.guardarStorage();
	}

	borrar(i:number){
		this.lista.items.splice(i,1);
		this.cambioCheck();
	}

}
