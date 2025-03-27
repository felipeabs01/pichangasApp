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

  jugadorACambiar1:any;
  jugadorACambiar2:any;

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

  cambiarJugador(jug:any){
    console.log(jug);

    if(!this.jugadorACambiar2 && this.jugadorACambiar1)
    this.jugadorACambiar2 = jug;

    if(!this.jugadorACambiar1)
    this.jugadorACambiar1 = jug;


    console.log(this.jugadorACambiar1);
    console.log(this.jugadorACambiar2);

    console.log(this.jugadoresAlfa);
    console.log(this.jugadoresBeta);
    jug.cambiarJugador = true;

   
    if(this.jugadorACambiar1 && this.jugadorACambiar2){

      let nuevaLista:any = [];
      this.jugadores.forEach((jug:any) => {
        if(jug == this.jugadorACambiar1 || jug == this.jugadorACambiar2 ){

          if(jug == this.jugadorACambiar1){
            this.jugadores.forEach((ju:any) => {
              if(ju == this.jugadorACambiar2){
                nuevaLista.push(ju);
              }
            });
          }

          if(jug == this.jugadorACambiar2){
            this.jugadores.forEach((ju:any) => {
              if(ju == this.jugadorACambiar1){
                nuevaLista.push(ju);
              }
            });
          }


        }else{
          nuevaLista.push(jug);
        }
      });

      

      console.log(nuevaLista);
      this.jugadores = nuevaLista;
      this.jugadorACambiar1 = null;
      this.jugadorACambiar2 = null;
      this.jugadoresAlfa = [];
      this.jugadoresBeta = [];
      
      let mitadCantidad = this.jugadores.length / 2;
      console.log(mitadCantidad);
      
      let contador = 1;
      this.jugadores.forEach((element:any) => {
        element.cambiarJugador = false;
        if(contador <=mitadCantidad){
          this.jugadoresAlfa.push(element);
        }else{
          this.jugadoresBeta.push(element);

        }
         contador = contador + 1;

      });

      console.log(this.jugadoresAlfa);
      console.log(this.jugadoresBeta);
      

    }
    

  }

}
