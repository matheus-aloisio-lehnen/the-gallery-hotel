import { createAction, props } from '@ngrx/store';
import { Staff } from "../../../../domain/interface/staff.interface";

export const selectStaff = createAction(
    '[Staff] Select Staff',
    props<{ id: number }>()
);

export const deselectStaff = createAction('[Staff] Deselect Staff',);

export const addStaffsToList = createAction(
    '[Staff] Add staffs to List',
    props<{ staffList: Staff[] }>()
);

export const clearStaffs = createAction('[Staff] Clear Companies');

export const addStaff = createAction(
    '[Item] Add Staff',
    props<{ staff: Staff }>()
);

export const updateStaff = createAction(
    '[Staff] Update Staff',
    props<{ staff: Staff }>()
)

export const deleteStaff = createAction(
    '[Staff] Delete Staff',
    props<{ id: number }>()
);