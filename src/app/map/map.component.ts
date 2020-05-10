import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
 // initial center position for the map
 lat = 27.9506;
 lng = -82.4572;

  // google maps zoom level
  zoom = 8;
  markers: Marker[] = [
    {
      lat: 	this.lat,
      lng:  this.lng,
      label: 'A',
      draggable: true
    },
    {
      lat: this.lat,
      lng: this.lng,
      label: 'B',
      draggable: false
    },
    {
      lat: this.lat,
      lng: this.lng,
      label: 'C',
      draggable: true
    }
  ]


  ngOnInit(){
    setTimeout(()=>{
      this.geoLocation();
    }, 10000);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  geoLocation(){
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
            this.lng = position.coords.longitude;
            this.lat = position.coords.latitude;
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };
  }

}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
