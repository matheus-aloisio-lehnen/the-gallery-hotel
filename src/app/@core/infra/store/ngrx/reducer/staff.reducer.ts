import { StaffState } from "../../../../domain/type/staff-state.type";
import { createReducer, on } from "@ngrx/store";
import {
    addStaff,
    addStaffsToList,
    clearStaffs,
    deselectStaff,
    selectStaff,
    updateStaff
} from "../actions/staff.actions";
import { Staff } from "../../../../domain/interface/staff.interface";

const initialStaffState: StaffState = {
    selectedStaff: null,
    staffList: [],
};

export const staffReducer = createReducer(
    initialStaffState,
    on(addStaffsToList, ( state, { staffList }) => ({
        ...state,
        staffList
    })),
    on(clearStaffs, state => ({
        ...state,
        staffList: []
    })),
    on(selectStaff, (state, { id }) =>  {
        const selectedStaff = state.staffList.find((staff: Staff)=> staff.id === id) || null;
        return {
            ...state,
            selectedStaff
        }
    }),
    on(deselectStaff, state => ({
        ...state,
        selectedStaff: null
    })),
    on(addStaff, (state, {staff}) => ({
        ...state,
        staffList: [...state.staffList, staff]
    })),
    on(updateStaff, (state, { staff }) => ({
        ...state,
        staffList: state.staffList.map(c => c.id === staff.id ? staff : c)
    }))
)