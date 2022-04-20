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
import { CallStatus } from "../common/call-status";

@Component({
	selector: "device-registry",
	templateUrl: "./device-registry.component.html",
	styleUrls: ["./device-registry.component.css"]
})

export class DeviceRegistry implements OnInit {

    callStatus: CallStatus = new CallStatus();
    private deviceJson = "";
    private deviceId = "";

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        let id = params['id'];
        if (id) {
          this.deviceId = id;
          this.getDevice();
        }
        else {
          this.deviceId = "";
        }
      });
    }

    constructor(private registryService: RegistryService,
				        private cookieService: CookieService,
                public router: Router,
                public route: ActivatedRoute) {

    }

    getDevice() {
      this.callStatus.submit();
      this.registryService.getDeviceById(this.deviceId)
      .then(res => {
        this.callStatus.callback("Got device data.", true);
        this.deviceJson = JSON.stringify(res);
      })
      .catch(error => {
        this.callStatus.error("Error while getting device data.", error);
        this.deviceJson = "";
        this.deviceId = "";
      });
    }

    registerDevice() {
      this.callStatus.submit();
      if (this.deviceId == "") {
        this.registryService.addDevice(this.deviceJson)
        .then(res => {
          this.callStatus.callback("New device registered.", true);
          this.deviceJson = "";
          this.deviceId = "";
        })
        .catch(error => {
          this.callStatus.error("Error while registering.", error);
        });
      }
      else {
        this.registryService.updateDevice(this.deviceJson)
        .then(res => {
          this.callStatus.callback("Device updated.", true);
          this.deviceJson = "";
          this.deviceId = "";
        })
        .catch(error => {
          this.callStatus.error("Error while updating.", error);
        });
      }
    }

}
