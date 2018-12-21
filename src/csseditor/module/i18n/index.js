import en_US  from './lang/en-US';
import ko_KR  from './lang/ko-KR';

export const langs = {
    en_US,
    ko_KR
}


export const LANG_EN = 'en_US';
export const LANG_KO = 'ko_KR';
export const FALLBACK_LANG = LANG_EN;

const i18n = {
    get (key, lang = FALLBACK_LANG) {
        return langs[lang][key] || langs[FALLBACK_LANG][key] || undefined;
    }
}

export default i18n;