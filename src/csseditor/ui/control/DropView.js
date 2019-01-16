import UIElement from "../../../colorpicker/UIElement";
import { DROP, DRAGOUT, DRAGOVER, PASTE } from "../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../module/SelectionTypes";
import { ITEM_PREPEND_IMAGE_URL, ITEM_PREPEND_IMAGE_FILE } from "../../module/ItemCreateTypes";

export default class DropView extends UIElement {

    template () {
        return `
            <div class='drop-view'>
                <div class='drop-overview'></div>
            </div>
        `
    }

    [DRAGOVER('document')] (e) {
        e.preventDefault() 
        this.$el.show();
    }

    [DRAGOUT('document')] (e) {
        e.preventDefault();
        this.$el.hide();
    }

    [DROP('document')] (e) {
        e.preventDefault(); 

        var dataTransfer = e.dataTransfer;

        var items = [...dataTransfer.items]
        var types = [...dataTransfer.types].filter(type => type == 'text/uri-list');
        
        var dataList = types.map(type => {
            return dataTransfer.getData(type);
        })

        if (dataList.length) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.read('image/get/url', dataList, (img) => {
                    this.dispatch(ITEM_PREPEND_IMAGE_URL, img, true, layer.id);
                })
            })            
        }

        var files = [...dataTransfer.files]; 
        if (files.length) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.read('image/get/file', files, (img) => {
                    this.dispatch(ITEM_PREPEND_IMAGE_FILE, img, true, layer.id);
                })
            })
        }

    }


    [PASTE('document')] (e) {

        var dataTransfer = e.clipboardData;

        var items = [...dataTransfer.items]
        var types = [...dataTransfer.types].filter(type => type == 'text/uri-list');
        
        var dataList = types.map(type => {
            return dataTransfer.getData(type);
        })

        if (dataList.length) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.read('image/get/url', dataList, (url) => {
                    this.dispatch(ITEM_PREPEND_IMAGE_URL, url, true, layer.id);
                })
            })            
        }

        var files = [...dataTransfer.files]; 
        if (files.length) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.read('image/get/file', files, (img) => {
                    this.dispatch(ITEM_PREPEND_IMAGE_FILE, img, true, layer.id);
                    this.refresh();
                })
            })
        }

    }
}