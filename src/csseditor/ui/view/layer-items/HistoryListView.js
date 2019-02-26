import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD } from "../../../../util/Event";
import { CHANGE_SELECTION, CHANGE_HISTORY, CHANGE_PAGE } from "../../../types/event";
import { HISTORY_LIST, HISTORY_SELECTED_CHECK } from "../../../types/HistoryTypes";
import { EMPTY_STRING } from "../../../../util/css/types";

export default class HistoryListView extends UIElement {

    template () { 
        return `
            <div class='history-list-view show-mini-view'>
                <div class="history-list" ref="$historyList"></div>
            </div>
        `
    }
    

    [LOAD('$historyList')] () {
        return this.read(HISTORY_LIST).map( (h, index) => {
            var selected = this.read(HISTORY_SELECTED_CHECK, index)
            return `<div>${h.title} ${selected ? 'selected' : EMPTY_STRING}</div>`
        })
    }



    refresh () {
        this.load()
    }


    // all effect 
    [EVENT(
        CHANGE_PAGE,
        CHANGE_SELECTION,
        CHANGE_HISTORY
    )] () { this.refresh(); }

}