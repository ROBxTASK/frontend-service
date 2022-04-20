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

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { AppCommonModule } from "../common/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserMgmtModule } from "../user-mgmt/user-mgmt.module";

import { RegistryRoutingModule } from './registry-routing.module';
import { DeviceRegistry } from './device-registry.component';
import { DeviceSearch } from './device-search.component';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RegistryRoutingModule,
        UserMgmtModule,
        NgbModule.forRoot()
    ],
    declarations: [
        DeviceRegistry,
        DeviceSearch
    ],
    exports: [
        DeviceRegistry,
        DeviceSearch
    ],
    providers: [
    ]
})

export class RegistryModule { }