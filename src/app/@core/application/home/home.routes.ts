import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { RouteList } from "../../domain/enum/route-list.enum";

export const homeRoutes: Routes = [
    { path: '', redirectTo: RouteList.dash, pathMatch: 'full' },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: RouteList.dash,
                loadComponent: () => import('./dash/dash.component')
                    .then(c => c.DashComponent)
            },
            {
                path: RouteList.rooms,
                loadComponent: () => import('./rooms/rooms.component')
                    .then(c => c.RoomsComponent)
            },
            {
                path: RouteList.reservations,
                loadComponent: () => import('./reservations/reservations.component')
                    .then(c => c.ReservationsComponent)
            },
            {
                path: RouteList.staff,
                loadComponent: () => import('./staff/staff.component')
                    .then(c => c.StaffComponent)
            },
        ]
    },
];
