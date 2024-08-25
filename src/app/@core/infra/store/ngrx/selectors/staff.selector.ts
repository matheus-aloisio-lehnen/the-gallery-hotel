import { AppState } from "../../../../domain/type/app-state.type";
import { createSelector } from "@ngrx/store";
import { StaffState } from "../../../../domain/type/staff-state.type";

export const selectStaffState = (state: AppState) => state.staffState;

export const selectSelectedStaff = createSelector(
    selectStaffState,
    (state: StaffState) => state.selectedStaff
);

export const selectAllStaffs = createSelector(
    selectStaffState,
    (state: StaffState) => state.staffList
);

export const hasStaffs = createSelector(
    selectAllStaffs,
    (staffList) => staffList.length > 0
);
