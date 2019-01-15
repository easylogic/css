import BaseModule from "../../colorpicker/BaseModule";
import i18n, { LANG_EN, LANG_KO } from "./i18n/index";
import { ACTION, GETTER } from "../../util/Store";
import { CHANGE_EDITOR } from "../types/event";

export default class I18nManager extends BaseModule {

    initialize( ) {
        super.initialize() 

        this.$store.lang = LANG_EN
    }

    afterDispatch() {
        this.emit(CHANGE_EDITOR);
    }

    [ACTION('i18n/change/language')] ($store, lang = LANG_EN) {
        $store.lang = lang; 
    }

    [GETTER('i18n/get')] ($store, key, params = {}, lang) {
        return i18n.get(key,  params, lang || $store.lang);
    }

}