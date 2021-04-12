/*
* Copyright 2020
* SRDC - Software Research & Development Consultancy; Ankara; Turkey
In collaboration with
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
import { CategorySearchComponent } from "../catalogue/category/category-search.component";
import { ProductPublishComponent } from "../catalogue/publish/product-publish.component";
import { CatalogueViewComponent } from "../catalogue/ubl-model-view/catalogue/catalogue-view.component";
import { FavouriteViewComponent } from "../catalogue/favourite/favourite-view.component";
import { CompareViewComponent } from "../catalogue/compare-product/compare-view.component";
import { CatalogueLinePanelComponent } from "../catalogue/ubl-model-view/catalogue/catalogue-line-panel.component";
import { PublishDeactivateGuardService } from "../catalogue/publish-deactivate-guard.service";
import { CategoryDeactivateGuardService } from "../catalogue/category/category-deactivate-guard.service";
import { CategoryTreeComponent } from "../catalogue/category/category-tree.component";
import { EditPropertyModalComponent } from "../catalogue/publish/edit-property-modal.component";
import { ProductDeliveryTradingComponent } from "../catalogue/publish/product-delivery-trading.component";
import { ProductPriceTabComponent } from "../catalogue/publish/product-price-tab.component";
import { ProductCertificatesTabComponent } from "../catalogue/publish/product-certificates-tab.component";
import { UserMgmtModule } from "../user-mgmt/user-mgmt.module";
import { NoteFileViewComponent } from '../catalogue/ubl-model-view/note-file-view.component';
import { BulkPublishComponent } from "../catalogue/publish/bulk-publish.component";
import { OptionsPanelComponent } from '../catalogue/publish/options-panel.component';
import { OriginDestinationViewComponent } from '../catalogue/publish/origin-destination-view-component';
import { NameDescriptionPanelComponent } from '../catalogue/publish/name-description-panel.component';
import { LogisticServicePublishComponent } from '../catalogue/publish/logistic-service-publish.component';
import { LogisticPublishDeactivateGuardService } from '../catalogue/logistic-publish-deactivate-guard.service';
import { DeleteExportCatalogueModalComponent } from "../catalogue/ubl-model-view/catalogue/delete-export-catalogue-modal.component";


import { IAssetRegistryRoutingModule } from './iasset-registry-routing.module';
import { AssetTypeRegistry } from './type-registry.component';
import { AssetInstanceRegistry } from './instance-registry.component';
import { AssetSearch } from './asset-search.component';
import { AssetDetail } from './asset-detail.component';
import { AssetImageLoader } from './image-loader.component';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        IAssetRegistryRoutingModule,
        UserMgmtModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AssetTypeRegistry,
        AssetInstanceRegistry,
        AssetDetail,
        AssetSearch,
        AssetImageLoader
    ],
    exports: [
        AssetTypeRegistry,
        AssetInstanceRegistry,
        AssetDetail,
        AssetSearch,
        AssetImageLoader
    ],
    providers: [
        //PublishDeactivateGuardService,
        //CategoryDeactivateGuardService,
        //LogisticPublishDeactivateGuardService
    ]
})
export class IAssetRegistryModule { }
