import {Component, Input} from "@angular/core";
import {CatalogueLine} from "../../model/publish/catalogue-line";
import {CatalogueService} from "../../catalogue.service";
import {Router} from "@angular/router";
import {BinaryObject} from "../../model/publish/binary-object";
import {UserService} from "../../../user-mgmt/user.service";
import * as myGlobals from '../../../globals';
import {FormGroup} from "@angular/forms";
import {ChildForm} from "../../child-form";

@Component({
    selector: 'catalogue-line-view',
    templateUrl: './catalogue-line-view.component.html'
})

// Component that displays information for individual catalogue lines in the Catalogue page

export class CatalogueLineViewComponent extends ChildForm {

    @Input() catalogueLine: CatalogueLine;
    @Input() presentationMode: string;
    @Input() parentForm: FormGroup;

    selectedTab: string = "Product Details";
    partyRole: string = "";
    regularProductDetailsForm: FormGroup = new FormGroup({});
    transportationServiceDetailsForm: FormGroup = new FormGroup({});
	public debug = myGlobals.debug;

	ngOnInit() {
	    this.addToParentForm('productDetails', this.regularProductDetailsForm);
    }

    ngOnDestroy() {
	    this.removeFromParentForm('productDetails');
	    this.removeFromParentForm('transportationServiceDetails');
    }

    private addImage(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let images = this.catalogueLine.goodsItem.item.productImage;

            for (let i = 0; i < fileList.length; i++) {
                let file: File = fileList[i];
                let reader = new FileReader();

                reader.onload = function (e: any) {
                    let base64String = reader.result.split(',').pop();
                    let binaryObject = new BinaryObject(base64String, file.type, file.name, "", "");
                    images.push(binaryObject);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    deleteImage(index: number): void {
        if (this.presentationMode == 'edit') {
            this.catalogueLine.goodsItem.item.productImage.splice(index, 1);
        }
    }

    changePartyRole(role:string) {
        this.partyRole = role;
        if(role == 'Manufacturer') {
            this.removeFromParentForm('transportationServiceDetails');
            this.addToParentForm('productDetails', this.regularProductDetailsForm);

        } else if(role == 'Transport Service Provider') {
            this.removeFromParentForm('productDetails');
            this.addToParentForm('transportationServiceDetails', this.transportationServiceDetailsForm);
        }
    }
}
