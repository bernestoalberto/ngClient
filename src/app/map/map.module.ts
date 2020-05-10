import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
const GKEY = environment.googleMapsApiKey;
@NgModule({
  declarations: [MapComponent],
  imports: [
  CommonModule,
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: GKEY
    })
  ]
})
export class MapModule { }
