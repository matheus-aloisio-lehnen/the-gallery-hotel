import { Icon } from "../enum/icon.enum";
import { Sidenav } from "../type/sidenav.type";
import { RouteList } from "../enum/route-list.enum";

export const SIDENAV: Sidenav[] = [
    {
        title: 'Dashboard',
        icon: Icon.dashboard,
        link: RouteList.dashboard
    },
    {
        title: 'Quartos',
        icon: Icon.rooms,
        link: RouteList.rooms
    },
    {
        title: 'Reservas',
        icon: Icon.reservation,
        link: RouteList.reservations
    },
]
