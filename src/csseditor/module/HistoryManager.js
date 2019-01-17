import BaseModule from "../../colorpicker/BaseModule";
import { SELECT_MODE_ONE } from "./SelectionManager";
import { ACTION } from "../../util/Store";
import { ITEM_SET_ALL } from "../types/ItemTypes";
import { HISTORY_INITIALIZE, HISTORY_PUSH, HISTORY_UNDO, HISTORY_REDO } from "../types/HistoryTypes";
import { SELECTION_INITIALIZE_DATA, SELECTION_CURRENT_PAGE } from "../types/SelectionTypes";
import { clone } from "../../util/functions/func";
import { ITEM_GET_ALL } from "../types/ItemSearchTypes";

const HISTORY_MAX = 200; 

export default class HistoryManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.historyOriginal = {}
        this.$store.histories = {}
        this.$store.historyIndex = {};
    }

    afterDispatch () {
        this.$store.emit('changeHistory')
    }

    changeHistory ($store, page) {
        
        if ($store.historyIndex[page.id] < 0) {
            var command = $store.historyOriginal[page.id];
        } else {
            var index = $store.historyIndex[page.id];
            var command = $store.histories[page.id][index];
        }

        if (command) {
            var {items, selection} = command;
            $store.selection = selection || $store.read(SELECTION_INITIALIZE_DATA);
            $store.dispatch(ITEM_SET_ALL, page.id, clone (items))
        }
    }        

    [ACTION(HISTORY_INITIALIZE)] ($store) {
        $store.read(SELECTION_CURRENT_PAGE, (page) => {
            this.setHistory($store, page);
        })
    }

    setHistory($store, page) {
        if (page && !$store.historyOriginal[page.id]) {
            $store.historyOriginal[page.id] = { 
                items: clone($store.read(ITEM_GET_ALL, page.id)), 
                selection: $store.selection || $store.read(SELECTION_INITIALIZE_DATA)
            }
            $store.histories[page.id] = [] 
            $store.historyIndex[page.id] = 0;
        }
    }

    [ACTION(HISTORY_PUSH)] ($store, title) {
        $store.read(SELECTION_CURRENT_PAGE, (page) => {

            this.setHistory($store, page);

            var index = $store.historyIndex[page.id];
            if (index < 0) index = -1; 
            var histories = (index < 0) ? [] : $store.histories[page.id].slice(0, index + 1);

            histories.push({ 
                title, 
                items: clone($store.read(ITEM_GET_ALL, page.id)),
                selection: $store.selection || $store.read(SELECTION_INITIALIZE_DATA)
            });

            $store.histories[page.id] = histories;

            if ($store.histories[page.id].length > HISTORY_MAX) {
                $store.histories[page.id].shift();
            }

            $store.historyIndex[page.id] = $store.histories[page.id].length -1;
        })
    }

    [ACTION(HISTORY_UNDO)] ($store) {
        $store.read(SELECTION_CURRENT_PAGE, (page) => {        

            if ($store.historyIndex[page.id] < 0) {
                return;
            }

            $store.historyIndex[page.id]--;
            this.changeHistory($store, page)
        })
    }


    [ACTION(HISTORY_REDO)] ($store) {
        $store.read(SELECTION_CURRENT_PAGE, (page) => {        
            if ($store.historyIndex[page.id] > $store.histories[page.id].length -1) {
                return; 
            }

            $store.historyIndex[page.id]++;
            this.changeHistory($store, page)
        });
    }        
}