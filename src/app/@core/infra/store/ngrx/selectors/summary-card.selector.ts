import { AppState } from "../../../../domain/type/app-state.type";
import { createSelector } from "@ngrx/store";
import { SummaryCardState } from "../../../../domain/type/summary-card-state.type";

export const selectSummaryCardState = (state: AppState) => state.summaryCardState;

export const selectSummaryCard = createSelector(
    selectSummaryCardState,
    (state: SummaryCardState) => state.summaryCard
);