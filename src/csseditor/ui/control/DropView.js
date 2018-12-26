import UIElement from "../../../colorpicker/UIElement";
import { DROP, DRAGOUT, DRAGOVER, PASTE } from "../../../util/Event";

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
            this.read('/selection/current/layer', (layer) => {
                this.read('/image/get/url', dataList, (img) => {
                    this.dispatch('/item/prepend/image/url', img, true, layer.id);
                })
            })            
        }

        var files = [...dataTransfer.files]; 
        if (files.length) {
            this.read('/selection/current/layer', (layer) => {
                this.read('/image/get/file', files, (img) => {
                    this.dispatch('/item/prepend/image/file', img, true, layer.id);
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
            this.read('/selection/current/layer', (layer) => {
                this.read('/image/get/url', dataList, (url) => {
                    this.dispatch('/item/prepend/image/url', url, true, layer.id);
                })
            })            
        }

        var files = [...dataTransfer.files]; 
        if (files.length) {
            this.read('/selection/current/layer', (layer) => {
                this.read('/image/get/file', files, (img) => {
                    this.dispatch('/item/prepend/image/file', img, true, layer.id);
                    this.refresh();
                })
            })
        }

    }
}