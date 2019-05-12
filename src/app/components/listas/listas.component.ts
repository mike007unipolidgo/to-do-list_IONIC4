import { Component, Input, ViewChild } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

	@ViewChild(IonList) list:IonList;
	@Input() terminada = true;
	
	constructor(
	public deseoService:DeseosService,
	private router:Router,
	private alertCtrl:AlertController
	){}

	async editarLista(lista:Lista){
		const alert = await this.alertCtrl.create({
			header:'Editar lista',
			inputs: [{
				name:'titulo',
				type:'text',
				value:lista.titulo,
				placeholder:'Nombre de la lista'
			}],
			buttons:[{
				text:'Cancelar',
				role:'cancel',
				handler: () => this.list.closeSlidingItems()
			},
			{
				text:'Editar',
				handler: (data) => {
					if (data.titulo.length === 0) {
						return;
					}
					lista.titulo = data.titulo;
					this.deseoService.guardarStorage();
					this.list.closeSlidingItems();
				}
			}
			]
		});
		alert.present();
	}

	listaSeleccionada(lista:Lista){
		if (this.terminada) {
			this.router.navigateByUrl('/tabs/tab2/agregar/' + lista.id);
		} else {
			this.router.navigateByUrl('/tabs/tab1/agregar/' + lista.id);
		}
	}
	
	borrarLista(lista:Lista){
		this.deseoService.borrarLista(lista);
	}

}
