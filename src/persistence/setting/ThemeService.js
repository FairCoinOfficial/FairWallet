import React from 'react';
import {Theme} from '../../component/Theme';
import {LMStorageService} from '../storage/LMStorageService';


export const ThemeService = {
    set,
    get,
    list,
    setDefault,
    getDefault
};

async function get() {
    return Theme.DEFAULT_Theme.mode;
}

async function set(theme) {
    return await LMStorageService.setItem('Theme', theme);
}

async function list() {
    return Theme.Theme_LIST;
}

async function setDefault(theme) {
    await LMStorageService.setItem('defaulttheme', theme);
}

async function getDefault() {
    return await LMStorageService.getItem('defaultheme') || ApplicationProperties.DEFAULT_Theme;
}
