import BaseModule from "../../colorpicker/BaseModule";

const HISTORY_MAX = 200; 

export default class HistoryManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.histories = []
        this.$store.historyIndex = 0;
    }

    afterDispatch () {
        
    }

    changeHistory ($store, seek) {
        var command = $store.histories[seek];
        $store.historyIndex = seek; 

        $store.items = command.items
        $store.emit('changeHistory');        
    }        

    '/history/initialize' ($store) {
        $store.histories = [] 
        $store.historyIndex = 0;
    }

    '/history/push' ($store, title) {

        var histories = $store.histories.slice(0,$store.historyIndex);

        histories.push({ title, items: $store.read('/clone', $store.items) });

        $store.histories = histories;

        if ($store.histories.length > HISTORY_MAX) {
            $store.histories.shift();
        }

        $store.historyIndex = $store.histories.length -1;
        $store.emit('pushHistory');
    }

    '/history/undo' ($store) {
        var seek = $store.historyIndex--;

        if (seek < 0) {
            return; 
        }

        this.changeHistory($store, seek)

    }


    '/history/redo' ($store) {

        var seek = ++$store.historyIndex;

        if (seek > $store.histories.length -1) {
            return; 
        }

        this.changeHistory($store, seek)
    }        
}