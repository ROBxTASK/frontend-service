import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDesignComponent } from './task-design.component';

const routes: Routes = [
	{ path: '', component: TaskDesignComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskDesignRoutingModule { }
