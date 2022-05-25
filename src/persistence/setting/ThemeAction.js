
import {changeDefaultSuccess, changeSuccess, listSuccess} from "./ThemeReducer";
import { ThemeService } from './ThemeService';

export const ThemeAction = {set, setDefault, getDefault};

function set(item) {
    return async dispatch => {
        const theme = item || await ThemeService.get();
        await ThemeService.set(theme);
        dispatch(changeSuccess(theme));
    };

}

function list() {
    return async dispatch => {
        dispatch(listSuccess(await ThemeService.list()));
    };
}

function setDefault(theme) {
    return async dispatch => {
        await ThemeService.setDefault(theme);
        dispatch(changeDefaultSuccess(theme));
    };
}

function getDefault() {
    return async dispatch => {
        dispatch(changeDefaultSuccess(await ThemeService.getDefault()));
    };
}
