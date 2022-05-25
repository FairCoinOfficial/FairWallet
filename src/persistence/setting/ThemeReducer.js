import {createSlice} from "@reduxjs/toolkit";
import {BackgroundTheme} from "../../module/theme/theme2";
import {Theme} from "../../component/Theme";
const ThemeReducer = createSlice({
    name: 'theme',
    initialState: {
        theme: BackgroundTheme[Theme.DEFAULT_Theme.mode],
        themes: Theme.Theme_LIST,
        defaulttheme: Theme.DEFAULT_Theme
    },
    reducers: {
        changeSuccess(state, {payload}) {
            state.theme = BackgroundTheme[payload];
        },
        listSuccess(state, {payload}) {
            state.themes = payload;
        },
        changeDefaultSuccess(state, {payload}) {
            state.defaulttheme = payload;
        }
    },
})
// Extract the action creators object and the reducer
const {actions, reducer} = ThemeReducer;
// Extract and export each action creator by name
export const {changeSuccess, listSuccess, changeDefaultSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;
