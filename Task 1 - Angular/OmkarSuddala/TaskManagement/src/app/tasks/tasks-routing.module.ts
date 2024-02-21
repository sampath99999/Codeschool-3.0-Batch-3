import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { CompletedComponent } from './completed/completed.component';
import { CreatetaskComponent } from './createtask/createtask.component';

const routes: Routes = [
  {
    path: "all",
    component: AllComponent
  }, {
    path: "",
    redirectTo: "/tasks/all",
    pathMatch: "full"
  },
  {
    path: "completed",
    component: CompletedComponent
  },
  {
    path: "create",
    component: CreatetaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
