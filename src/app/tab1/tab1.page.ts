import { Component, ViewChild } from '@angular/core';
// import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { ActionSheetController, IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { EquiposService } from '../tabs/equipo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  // @ViewChild(IonModal) modal: IonModal;

 
  jugador:any;

  cantJugadores = 14;
  mitadCantidad = 7;
  jugadores:any=[];
  
  puedeSeleccionarCapitanes = false;

  equipoAlfa :any=[];
  equipoBeta :any=[];
  cantidadEquipoAlfa = 0;
  cantidadEquipoBeta = 0;

  equipoAlfaCero :any=[];
  equipoBetaCero :any=[];
  cantidadEquipoAlfaCero = 0;
  cantidadEquipoBetaCero= 0;

  verDiferenciasEquipos = false;

  isModalOpen = false;
  mensaje ="";
  colorCamisetaAlfa ="";
  colorCamisetaBeta ="";
  fechaHoraCancha ="";



  constructor(
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,
    public equiposService: EquiposService,
    // private socialSharing: SocialSharing
  ) {
   
    this.setearJugadores(this.cantJugadores);
  }


  cancel() {
    // this.modal.dismiss(null, 'cancel');
    // this.isModalOpen = false;
  }

  confirm() {

    // this.modal.dismiss(this.jugador, 'confirm');
    // this.isModalOpen = false;
  }

 

  setOpen(isOpen:any, jug:any) {
    this.isModalOpen = isOpen;
    console.log(jug);
    this.jugador = jug;
  }

  setearJugadores(cantidad:any){
    this.jugadores = [];
    for (let index = 1; index <= this.cantJugadores; index++) {
      console.log(index);
      let req = {
        numero:index,
        nombre:null,
        calificacion:null,
        equipo:null,
        esCapitan:null,
        puedeCalificar : false,
      }
      this.jugadores.push(req);
    }

    console.log(this.jugadores);
    this.mitadCantidad = this.cantJugadores/2;

  }

  async cambiarCantidadJugadores() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar cantidad de jugadores',
      cssClass: 'my-custom-class',
      buttons: [
         { text: '10',icon: 'people',data: 10,
        handler: () => {console.log('people clicked');}
      },
         { text: '12',icon: 'people',data: 12,
        handler: () => {console.log('people clicked');}
      },
         { text: '14',icon: 'people',data: 14,
        handler: () => {console.log('people clicked');}
      },
         { text: '22',icon: 'people',data: 22,
        handler: () => {console.log('people clicked');}
      },
    ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);

    if(data){
      this.cantJugadores = data;
      this.setearJugadores(this.cantJugadores);
    }
  }

  async realizarEquipos() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Realizar equipos al azar',
      cssClass: 'my-custom-class',
      buttons: [
         { text: 'Seleccionar jugadores fijos',icon: 'people',data: 1,
        handler: () => {console.log('people clicked');}
      },
         { text: 'Realizar equipos al azar',icon: 'people',data: 2,
        handler: () => {console.log('people clicked');}
      },
         { text: 'Compartir',icon: 'share-social',data: 3,
        handler: () => {console.log('people clicked');}
      }
    ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);

    if(data){
      this.puedeSeleccionarCapitanes = false;
      if(data==1){
        this.puedeSeleccionarCapitanes = true;
      }
  
      if(data==2){

        let puedeRealizar = true;
        this.jugadores.forEach((element:any) => {
          if(element.calificacion == null){
            puedeRealizar = false;
            element.puedeCalificar = false;
          }
        });


        if(!puedeRealizar){
          const toast = await this.toastController.create({
            message: 'Ingrese la calificación de los jugadores.',
            color:'dark',
            position:'top',
            duration: 2000
          });
          toast.present();
        }else{
          this.realizarEquiposAzar();
        }
      }

      if(data==3){
        var options = {
          message: 'Equipos',
          url: this.mensaje,
        };
        // this.socialSharing.shareWithOptions(options);
      }

    }
  }




  realizarEquiposAzar(){
    this.verDiferenciasEquipos = true;
    this.mitadCantidad = this.cantJugadores / 2;

   let totalcal = this.jugadores.reduce((acc:any, val:any) => acc += val.calificacion, 0);
   console.log(totalcal);
   let tot = totalcal / this.cantJugadores;
   console.log(tot);


   for (let index = 0; index < 20; index++) {
    
     let nuevaLista = this.jugadores.sort(function() { return Math.random() - 0.5 });
     console.log(nuevaLista)

     let listaalfa = [];
     let listabeta = [];

     for (let index = 0; index < this.cantJugadores; index++) {
       const element = nuevaLista[index];
       if(index <= (this.mitadCantidad-1)){
         listaalfa.push(nuevaLista[index]);
       }else{
         listabeta.push(nuevaLista[index]);
       }
     }

     console.log(listaalfa);
     console.log(listabeta);

     let totalcalalfa = listaalfa.reduce((acc, val) => acc += val.calificacion, 0);
     console.log(totalcalalfa);
     let totalfa = totalcalalfa / this.cantJugadores;
     console.log(totalfa);
     
     let totalcalbeta = listabeta.reduce((acc, val) => acc += val.calificacion, 0);
     console.log(totalcalbeta);
     let totbeta = totalcalbeta / this.cantJugadores;
     console.log(totbeta);
     
     let difereciaalfa = totalcalalfa - totalcalbeta;
     let difereciabeta =  totalcalbeta - totalcalalfa;

     if(difereciaalfa >= 0){
       if(difereciaalfa <= 2){
         console.log(difereciaalfa);
         console.log(difereciabeta);
         this.equipoAlfa = listaalfa;
         this.equipoBeta = listabeta;
         this.cantidadEquipoAlfa = totalcalalfa;
         this.cantidadEquipoBeta = totalcalbeta;
       }
       if(difereciaalfa === difereciabeta){
         console.log(difereciaalfa);
         console.log(difereciabeta);
         this.equipoAlfaCero = listaalfa;
         this.equipoBetaCero = listabeta;
         this.cantidadEquipoAlfa = totalcalalfa;
         this.cantidadEquipoBeta = totalcalbeta;
         break;
       }
     }
     if(difereciabeta >= 0){
       if(difereciabeta <= 2){
         console.log(difereciaalfa);
         console.log(difereciabeta);
         this.equipoAlfa = listaalfa;
         this.equipoBeta = listabeta;
         this.cantidadEquipoAlfa = totalcalalfa;
         this.cantidadEquipoBeta = totalcalbeta;
       }
       if(difereciaalfa === difereciabeta){
         console.log(difereciaalfa);
         console.log(difereciabeta);
         this.equipoAlfaCero = listaalfa;
         this.equipoBetaCero = listabeta;
         this.cantidadEquipoAlfa = totalcalalfa;
         this.cantidadEquipoBeta = totalcalbeta;
         break;
       }
     }


   }

   
 console.log(this.cantidadEquipoAlfa);
 console.log(this.cantidadEquipoBeta);
 console.log(this.equipoAlfa);
 console.log(this.equipoBeta);


 console.log(this.equipoAlfaCero);
 console.log(this.equipoBetaCero);


 this.jugadores = [];
 this.equipoAlfa.forEach((element:any) => {
   this.jugadores.push(element);
 });
 this.equipoBeta.forEach((element:any) => {
   this.jugadores.push(element);
 });


 this.mensaje = '\n';
 this.mensaje = this.mensaje +'** Equipo 1 color:'+this.colorCamisetaAlfa+' ** \n';

 for (let index = 0; index < this.equipoAlfa.length; index++) {
   const element = this.equipoAlfa[index];
   this.mensaje = this.mensaje + ' '+ (index+1) + '- '+ element.nombre +'\n';
   console.log(this.mensaje);
 }
 this.mensaje = this.mensaje +'\n';
 this.mensaje = this.mensaje +'** Equipo 2 color:'+this.colorCamisetaBeta+' ** \n';
 for (let index = 0; index < this.equipoBeta.length; index++) {
   const element = this.equipoBeta[index];
   this.mensaje = this.mensaje + ' '+ (index+1) + '- '+ element.nombre +'\n';
   console.log(this.mensaje);
 }
 this.mensaje = this.mensaje +'\n';
 this.mensaje = this.mensaje +'Fecha / Hora / Cancha:'+this.fechaHoraCancha+' ** \n';



   this.equiposService.equipos$.next(this.jugadores);
   this.equiposService.equiposA$.next(this.equipoAlfa);
   this.equiposService.equiposB$.next(this.equipoBeta);

  }


  cambio(val:any,equipo:any){
    console.log(val);
    console.log(equipo);
    console.log(this.jugadores);

    // val.equipo = equipo;
    this.jugadores.forEach((element:any) => {
      if(element != equipo){
        element.puedeCalificar = false;
      }
    });
  }

  cambioRange(val:any){
    console.log(val);
  }

}
