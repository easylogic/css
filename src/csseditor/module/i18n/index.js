import en_US  from './lang/en-US';
import ko_KR  from './lang/ko-KR';
import { flatKeyValue, keyEach } from '../../../util/functions/func';

export const langs = {
    en_US: flatKeyValue(en_US),
    ko_KR: flatKeyValue(ko_KR) 
}


export const LANG_EN = 'en_US';
export const LANG_KO = 'ko_KR';
export const FALLBACK_LANG = LANG_EN;

const i18n = {
    get (key, params = {}, lang = FALLBACK_LANG) {
        var str = langs[lang][key] || langs[FALLBACK_LANG][key] || undefined;

        keyEach(params, (key, value) => {
            str = str.replace(new RegExp(`\{${key}\}`, 'ig'), value);
        })

        return str; 
    }
}

export default i18n;