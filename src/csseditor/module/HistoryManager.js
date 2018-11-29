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

    changeHistory (seek) {
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

        $store.histories.splice(
            $store.historyIndex - 1, 
            Number.MAX_SAFE_INTEGER, 
            { 
                title, 
                items: $store.read('/clone', $store.items) 
            }
        );

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

        this.changeHistory(seek)

    }


    '/history/redo' ($store) {

        var seek = ++$store.historyIndex;

        if (seek > $store.histories.length -1) {
            return; 
        }

        this.changeHistory(seek)
    }        
}