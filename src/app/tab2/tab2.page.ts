import { Component } from '@angular/core';
import { EquiposService } from '../tabs/equipo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  jugadorSeleccionado:any = null;
  jugadores :any=[];
  jugadoresAlfa :any=[];
  jugadoresBeta :any=[];

  constructor(  public equiposService: EquiposService,) {

    equiposService.equipos$.subscribe(data=>{
      console.log(data);
      this.jugadores = data;
    })
    equiposService.equiposA$.subscribe(data=>{
      console.log(data);
      this.jugadoresAlfa = data;
    })
    equiposService.equiposB$.subscribe(data=>{
      console.log(data);
      this.jugadoresBeta = data;
    })

  }

}
