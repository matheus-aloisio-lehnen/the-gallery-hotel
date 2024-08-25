import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as DarkModeActions from '../actions/dark-mode.actions';

const initialDarkModeState: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const darkModeReducer: ActionReducer<boolean> = createReducer(
    initialDarkModeState,
    on(DarkModeActions.toggleDarkMode, (state: boolean): boolean => !state),
);
