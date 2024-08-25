import { ActionReducer, createReducer, on } from '@ngrx/store';

import { SummaryCardState } from "../../../../domain/type/summary-card-state.type";
import { addSummaryCard } from "../actions/summary-card.action";

const initialSummaryCardState: SummaryCardState = {
    summaryCard: null,
};

export const summaryCardReducer: ActionReducer<SummaryCardState> = createReducer(
    initialSummaryCardState,
    on(addSummaryCard, (state, { summaryCard }) => ({
        ...state,
        summaryCard
    })),

);
