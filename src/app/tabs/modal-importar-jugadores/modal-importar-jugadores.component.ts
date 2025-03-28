import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-importar-jugadores',
  templateUrl: './modal-importar-jugadores.component.html',
  styleUrls: ['./modal-importar-jugadores.component.css'],
  standalone:false
})
export class ModalImportarJugadoresComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  name!: any;

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let lista:any = [];
    console.log(this.name);
    let texto = this.name.split("-");
    console.log(texto);
    
    texto.forEach((el:any) => {
      console.log(el);
      console.log(el.trimEnd());
      lista.push(el.trimEnd());
    });
    
    lista = lista.filter((a:any)=>a != "");
    console.log(lista);


    let index = 1;
    let jugadores:any = [];
    lista.forEach((jug:any) => {
      let req = {
        numero:index,
        nombre:jug,
        calificacion:null,
        equipo:null,
        esCapitan:null,
        puedeCalificar : false,
      }
      jugadores.push(req);
      index = index +1 ;
    });

    console.log(jugadores);
    
    
    return this.modalCtrl.dismiss(jugadores, 'confirm');
  }

}
