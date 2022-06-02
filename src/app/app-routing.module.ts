import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OnboardingComponent} from "./components/onboarding/onboarding.component";
import {SlateComponent} from "./components/slate/slate.component";

const routes: Routes = [
  { path: '', component: OnboardingComponent },
  { path: 'slate', component: SlateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
