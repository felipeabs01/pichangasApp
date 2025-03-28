import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { EquiposService } from './equipo.service';
import { ModalImportarJugadoresComponent } from './modal-importar-jugadores/modal-importar-jugadores.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage,ModalImportarJugadoresComponent],
  providers: [
    EquiposService,
]
})
export class TabsPageModule {}
