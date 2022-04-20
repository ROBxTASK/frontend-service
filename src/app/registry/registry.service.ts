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

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as myGlobals from '../globals';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class RegistryService {

    private url = myGlobals.registry_endpoint;
    private key = myGlobals.registry_endpoint_key;

    constructor(private http: Http, private cookieService: CookieService) {}

    private handleError(error: any): Promise<any> {
      return Promise.reject(error.message || error);
    }

    getDevices(): Promise<any> {
      const url = `${this.url}/devices?register_device_key=${this.key}`;
      return this.http
            .get(url, { withCredentials: true })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getDeviceById(deviceId:string): Promise<any> {
      const url = `${this.url}/device/${deviceId}?register_device_key=${this.key}`;
      return this.http
          .get(url, { withCredentials: true })
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
    }

    addDevice(device:any): Promise<any> {
      const url = `${this.url}/device?register_device_key=${this.key}`;
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http
            .post(url, device, { headers: headers, withCredentials: true })
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    updateDevice(device:any): Promise<any> {
      const url = `${this.url}/device?register_device_key=${this.key}`;
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http
            .put(url, device, { headers: headers, withCredentials: true })
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    deleteDevice(deviceId:string): Promise<any> {
      const url = `${this.url}/device/${deviceId}?register_device_key=${this.key}`;
      return this.http
          .delete(url, { withCredentials: true })
          .toPromise()
          .then(res => res)
          .catch(this.handleError);
    }

	/*
	* Not yet in use
	getTasks(): Promise<any> {
		const url = `${this.url}/tasks`;
		const token = 'Bearer ' + this.cookieService.get("bearer_token");
    const headers = new Headers({ 'Authorization': token });
    return this.http
        .get(url, { headers: headers, withCredentials: true })
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
	}

  postTask(task:any): Promise<any> {
    const url = `${this.url}/task`;
    const token = 'Bearer ' + this.cookieService.get("bearer_token");
    const headers = new Headers({ 'Authorization': token });
    return this.http
        .post(url, task, { headers: headers, withCredentials: true })
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }
	*/

}
