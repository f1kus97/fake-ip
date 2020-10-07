import { Component, OnInit } from '@angular/core';
import {IpAddressService} from '../../services/ip-address.service';
import { findFlagUrlByIso3Code } from 'country-flags-svg';
import {IPData} from '../../../model/IPData';

@Component({
  selector: 'app-main-ip',
  templateUrl: './main-ip.component.html',
  styleUrls: ['./main-ip.component.scss']
})
export class MainIpComponent implements OnInit {
  ipData: IPData = {ip: 'n/a', country: 'n/a', country_code3: 'n/a'};
  countryFlagSrc: '';

  constructor(private ipAddressService: IpAddressService) {}

  ngOnInit(): void {
    this.ipAddressService.getIPData().subscribe(next => {
      this.ipData = new IPData(next);
      this.countryFlagSrc = findFlagUrlByIso3Code(this.ipData.country_code3);
    });
  }
}
