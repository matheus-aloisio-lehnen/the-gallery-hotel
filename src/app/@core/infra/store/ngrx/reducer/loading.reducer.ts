import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as LoadingActions from '../actions/loading.actions';
import { AppState } from "../../../../domain/type/app-state.type";
import { LoadingState } from "../../../../domain/type/loading-state.type";

const initialLoadingState: AppState['loading'] = {};

export const loadingReducer: ActionReducer<LoadingState> = createReducer(
    initialLoadingState,
    on(LoadingActions.startLoading, (state, { context }) => ({
        ...state,
        [context]: true
    })),
    on(LoadingActions.finishLoading, (state, { context }) => ({
        ...state,
        [context]: false
    }))
);
