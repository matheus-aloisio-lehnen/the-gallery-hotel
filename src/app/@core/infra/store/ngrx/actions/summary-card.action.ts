import { createAction, props } from "@ngrx/store";
import { SummaryCard } from "../../../../domain/type/summary-card.type";

export const addSummaryCard = createAction(
    '[Staff] Add cards to List',
    props<{ summaryCard: SummaryCard }>()
);