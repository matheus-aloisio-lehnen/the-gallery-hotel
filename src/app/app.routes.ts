import { Routes } from '@angular/router';
import { RouteList } from "./@core/domain/enum/route-list.enum";

export const routes: Routes = [
    // { path: '', redirectTo: RouteList.signIn, pathMatch: 'full' },
    // { path: RouteList.signIn, loadComponent: () => import('./@core/application/auth/sign-in/sign-in.component').then(c => c.SignInComponent) },
    // { path: RouteList.signUp, loadComponent: () => import('./@core/application/auth/sign-up/sign-up.component').then(c => c.SignInComponent) },
    // { path: RouteList.changePassword, loadComponent: () => import('./@core/application/auth/sign-in/sign-in.component').then(c => c.SignInComponent) },
    // { path: RouteList.forgotPassword, loadComponent: () => import('./@core/application/auth/sign-in/sign-in.component').then(c => c.SignInComponent) },
    { path: '', redirectTo: RouteList.auth, pathMatch: 'full' },
    { path: RouteList.auth, loadChildren: () => import('./@core/application/auth/auth.routes').then(m => m.authRoutes) },
    { path: RouteList.home, loadChildren: () => import('./@core/application/home/home.routes').then(m => m.homeRoutes)},
    { path: RouteList.wildCard, loadComponent: () => import('./@core/application/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent) },
];
