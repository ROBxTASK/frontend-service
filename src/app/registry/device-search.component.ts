/*
 * Copyright 2020
 * SRFG - Salzburg Research Forschungsgesellschaft mbH; Salzburg; Austria
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { Component, OnInit } from "@angular/core";
import { RegistryService } from "./registry.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from 'ng2-cookies';
import { UserService } from "../user-mgmt/user.service";
import { selectPartyName } from "../common/utils";

@Component({
	selector: "device-search",
	templateUrl: "./device-search.component.html",
	styleUrls: ["./device-search.component.css"]
})

export class DeviceSearch implements OnInit {

	private devices = [];
	private filtered_devices = [];
	private search_running = true;
  private own_devices = false;
	private query = "";
	private comp_id;

    ngOnInit() {
  		this.route.queryParams.subscribe(params => {
        let q = params['q'];
        if (q) {
  				this.query = q;
          this.filterDevices();
        }
  		});
    }

    constructor(private registryService: RegistryService,
				        private cookieService: CookieService,
                private userService: UserService,
                public router: Router,
                public route: ActivatedRoute) {

		this.comp_id = this.cookieService.get("company_id");
		this.getDevices();

    }

	getDevices() {
		this.search_running = true;
		this.registryService.getDevices()
      .then(res => {
        this.devices = res;
        this.addAdditionalInfo();
      })
			.catch(error => {
				this.devices = [];
				this.filtered_devices = [];
        this.search_running = false;
			});
	}

  editDevice(deviceId) {
    this.router.navigate(['registry/device-registry'], { queryParams: { id: deviceId } });
  }

  deleteDevice(deviceId) {
    if (confirm("Are you sure you want to delete this device?"))
      this.registryService.deleteDevice(deviceId)
      .then(res => {
        this.getDevices();
      })
			.catch(error => {
        alert("Error deleting device - try again later.");
      });
  }

  addAdditionalInfo() {
    let comp_ids = [];
    for (let device of this.devices) {
      device.AdditionalInfo = {
        "DeviceOwnerName": "",
        "ShowSkills": false,
        "ShowConfig": false
      };
      if (device.DeviceOwner) {
        if (comp_ids.indexOf(device.DeviceOwner) == -1)
          comp_ids.push(device.DeviceOwner);
      }
    }
    if (comp_ids.length > 0) {
      this.userService.getParties(comp_ids, []).then(parties => {
          for (let device of this.devices) {
            for (let party of parties) {
                if (device.DeviceOwner == party.partyIdentification[0].id)
                  device.AdditionalInfo.DeviceOwnerName = selectPartyName(party.partyName);
            }
          }
          this.filterDevices();
          this.search_running = false;
      }).catch(error => {
          this.filterDevices();
          this.search_running = false;
      });
    }
    else
      this.filterDevices();
      this.search_running = false;
  }

	filterDevices() {
		if (this.query == "" && !this.own_devices) {
			this.filtered_devices = this.devices;
		}
		else {
			this.filtered_devices = [];
			for (let device of this.devices) {
				let deviceOwner = device.DeviceOwner;
				let deviceId = device.DeviceID;
				let deviceName = device.DeviceName;
        let deviceNameLC = deviceName.toLowerCase();
        let queryLC = this.query.toLowerCase();
				if (this.query == "" || deviceId.indexOf(this.query) != -1 || deviceNameLC.indexOf(queryLC) != -1) {
					if (!this.own_devices || this.comp_id == deviceOwner)
						this.filtered_devices.push(device);
				}
			}
		}
	}

  toggleGrp() {
    this.own_devices = !this.own_devices;
    this.filterDevices();
  }

	resetSearch() {
		this.query = "";
    this.own_devices = false;
		this.filterDevices();
	}

}
