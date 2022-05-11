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
import { Headers, Http, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as myGlobals from '../globals';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class TaskDesignService {

    private codegen_url = myGlobals.codegen_endpoint;

    constructor(private http: Http, private cookieService: CookieService) {}

    private handleError(error: any): Promise<any> {
      return Promise.reject(error.message || error);
    }

	generateCode(code:any,simulation:string): Promise<any> {
      const url = `${this.codegen_url}/${simulation}`;
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = {
        headers: new Headers({ 'Content-Type': 'application/json' }),
        responseType: ResponseContentType.Blob,
        withCredentials: true
      };
      return this.http
            .post(url, code, options)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

}
