import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DetailEntryComponent } from './components/detail-entry/detail-entry.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ThanksComponent } from './components/thanks/thanks.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent
    },
    {
        path: "sign-in",
        component: SignInComponent
    },
    {
        path: "sign-up",
        component: SignUpComponent
    },
    {
        path: "detail-entry",
        component: DetailEntryComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "donor",
        component: DashboardComponent
    },
    {
        path: "recipient",
        component: DashboardComponent
    },
    {
        path: "thanks",
        component: ThanksComponent
    },
];
