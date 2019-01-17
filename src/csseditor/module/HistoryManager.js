import BaseModule from "../../colorpicker/BaseModule";
import { ACTION, GETTER } from "../../util/Store";
import { HISTORY_INITIALIZE, HISTORY_PUSH, HISTORY_UNDO, HISTORY_REDO, HISTORY_LIST, HISTORY_SELECTED_CHECK } from "../types/HistoryTypes";
import { SELECTION_INITIALIZE_DATA, SELECTION_CURRENT_PAGE } from "../types/SelectionTypes";
import { clone } from "../../util/functions/func";
import { CHANGE_HISTORY, CHANGE_EDITOR } from "../types/event";

const HISTORY_MAX = 200; 

export default class HistoryManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.historyOriginal = null
        this.$store.histories = []
        this.$store.historyIndex = -1;
    }

    afterDispatch () {
        this.$store.emit(CHANGE_HISTORY)
    }

    [GETTER(HISTORY_LIST)] ($store) {
        return $store.histories || [];
    }

    [GETTER(HISTORY_SELECTED_CHECK)] ($store, index) {
        return $store.historyIndex == index; 
    }

    changeHistory ($store) {
        
        if ($store.historyIndex < 0) {
            var command = $store.historyOriginal;
        } else {
            var index = $store.historyIndex;
            var command = $store.histories[index];
        }

        if (command) {
            var {items, selection} = command;
            $store.selection = selection || $store.read(SELECTION_INITIALIZE_DATA);
            $store.items = clone (items)
            $store.emit(CHANGE_EDITOR)
        }
    }        

    [ACTION(HISTORY_INITIALIZE)] ($store) {
        $store.read(SELECTION_CURRENT_PAGE, (page) => {
            this.setHistory($store, page);
        })
    }

    setHistory($store) {
        if (!$store.historyOriginal) {
            $store.historyOriginal = { 
                items: clone($store.items), 
                selection: $store.selection || $store.read(SELECTION_INITIALIZE_DATA)
            }
            $store.histories = [] 
            $store.historyIndex = 0;
        }
    }

    [ACTION(HISTORY_PUSH)] ($store, title) {
        
            this.setHistory($store);

            var index = $store.historyIndex;
            if (index < 0) index = -1; 
            var histories = (index < 0) ? [] : $store.histories.slice(0, index + 1);

            histories.push({ 
                title, 
                items: clone($store.items),
                selection: $store.selection || $store.read(SELECTION_INITIALIZE_DATA)
            });

            $store.histories = histories;

            if ($store.histories.length > HISTORY_MAX) {
                $store.histories.shift();
            }

            $store.historyIndex = $store.histories.length -1;
    }

    [ACTION(HISTORY_UNDO)] ($store) {
        if ($store.historyIndex < 0) {
            return;
        }

        $store.historyIndex--;
        this.changeHistory($store)
    }


    [ACTION(HISTORY_REDO)] ($store) {

        if ($store.historyIndex > $store.histories.length -1) {
            return; 
        }

        $store.historyIndex++;
        this.changeHistory($store)

    }        
}