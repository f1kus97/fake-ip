import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-fingerprints',
  templateUrl: './fingerprints.component.html',
  styleUrls: ['./fingerprints.component.scss']
})
export class FingerprintsComponent implements OnInit {
  ip = '';
  webRTCIP = '';
  IPsMatch: boolean;

  ipLocation: google.maps.LatLngLiteral;
  geoApiLocation: google.maps.LatLngLiteral;
  locationsMatch: boolean;

  constructor() { }

  ngOnInit(): void {
    this.performIpMismatchCheck();
    this.performGeoMismatchCheck();
  }

  // TODO: Unit test
  private performIpMismatchCheck() {
    const int = setInterval(() => {
      if (this.ip !== '' && this.webRTCIP !== '') {
        this.ip.localeCompare(this.webRTCIP) === 0 ?  this.IPsMatch = true : this.IPsMatch = false;
        clearInterval(int);
      }
    }, 500);
  }

  // TODO: Unit test
  private performGeoMismatchCheck() {
    const int = setInterval(() => {
      if (this.ipLocation != null && this.geoApiLocation != null) {
        if (this.ipLocation.lng > this.geoApiLocation.lng) {
          this.ipLocation.lng - this.geoApiLocation.lng < 1.0 ? this.locationsMatch = true : this.locationsMatch = false;
        } else {
          this.geoApiLocation.lng - this.ipLocation.lng < 1.0 ? this.locationsMatch = true : this.locationsMatch = false;
        }

        if (this.ipLocation.lat > this.geoApiLocation.lat) {
          this.ipLocation.lat - this.geoApiLocation.lat < 0.5 ? this.locationsMatch = true : this.locationsMatch = false;
        } else {
          this.geoApiLocation.lat - this.ipLocation.lat < 0.5 ? this.locationsMatch = true : this.locationsMatch = false;
        }

        clearInterval(int);
      }
    }, 500);
  }

  public updateIP(ip: string) {
    this.ip = ip;
  }

  public updateWebRTCIP(ip: string) {
    this.webRTCIP = ip;
  }

  public updateIpLocation(location: google.maps.LatLngLiteral) {
    this.ipLocation = location;
  }

  public updateGeoApiLocation(location: google.maps.LatLngLiteral) {
    this.geoApiLocation = location;
  }
}
