import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from "../common/common.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TaskDesignRoutingModule } from './task-design-routing.module';
import { TaskDesignComponent } from './task-design.component';

@NgModule({
  imports: [
	CommonModule,
	AppCommonModule,
	FormsModule,
	ReactiveFormsModule,
	HttpModule,
	TaskDesignRoutingModule,
	NgbModule.forRoot()
  ],
  declarations: [
    TaskDesignComponent
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class TaskDesignModule { }
