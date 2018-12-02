import BaseModule from "../../colorpicker/BaseModule";

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
            var {items, selectedId} = command;
            $store.selectedId = selectedId;
            $store.dispatch('/item/set/all', page.id, $store.read('/clone', items))
        }
    }        

    '/history/initialize' ($store) {
        $store.read('/item/current/page', (page) => {
            this.setHistory($store, page);
        })
    }

    setHistory($store, page) {
        if (page && !$store.historyOriginal[page.id]) {
            $store.historyOriginal[page.id] = { 
                items: $store.clone('/item/get/all', page.id), 
                selectedId: $store.selectedId 
            }
            $store.histories[page.id] = [] 
            $store.historyIndex[page.id] = 0;
        }
    }

    '/history/push' ($store, title) {
        $store.read('/item/current/page', (page) => {

            this.setHistory($store, page);

            var index = $store.historyIndex[page.id];
            if (index < 0) index = -1; 
            var histories = (index < 0) ? [] : $store.histories[page.id].slice(0, index + 1);

            histories.push({ 
                title, 
                items: $store.clone('/item/get/all', page.id),
                selectedId: $store.selectedId
            });

            $store.histories[page.id] = histories;

            if ($store.histories[page.id].length > HISTORY_MAX) {
                $store.histories[page.id].shift();
            }

            $store.historyIndex[page.id] = $store.histories[page.id].length -1;
        })
    }

    '/history/undo' ($store) {
        $store.read('/item/current/page', (page) => {        

            if ($store.historyIndex[page.id] < 0) {
                return;
            }

            $store.historyIndex[page.id]--;
            this.changeHistory($store, page)
        })
    }


    '/history/redo' ($store) {
        $store.read('/item/current/page', (page) => {        
            if ($store.historyIndex[page.id] > $store.histories[page.id].length -1) {
                return; 
            }

            $store.historyIndex[page.id]++;
            this.changeHistory($store, page)
        });
    }        
}