import BaseModule from "../../colorpicker/BaseModule";
import i18n, { LANG_EN, LANG_KO } from "./i18n/index";

export default class I18nManager extends BaseModule {

    initialize( ) {
        super.initialize() 

        this.$store.lang = LANG_EN
    }

    afterDispatch() {
        this.emit('changeEditor');
    }

    '/i18n/change/language' ($store, lang = LANG_EN) {
        $store.lang = lang; 
    }

    '*/i18n/get' ($store, key, params = {}, lang) {
        return i18n.get(key,  params, lang || $store.lang);
    }

}