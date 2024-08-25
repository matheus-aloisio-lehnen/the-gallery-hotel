import { Staff } from "../interface/staff.interface";

export type StaffState = {
    selectedStaff: Staff | null;
    staffList: Staff[];
}
