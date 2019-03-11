import UIElement from "../../../util/UIElement";
import { DROP, DRAGOUT, DRAGOVER, PASTE } from "../../../util/Event";
import { IMAGE_GET_URL, IMAGE_GET_FILE } from "../../types/ImageTypes";
import { BackgroundImage } from "../../../editor/css-property/BackgroundImage";
import { URLImageResource, FileImageResource } from "../../../editor/image-resource/URLImageResource";
import { editor } from "../../../editor/editor";

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

    addImageResource (dataTransfer) {

        var imageResources = []

        var items = [...dataTransfer.items]
        var dataList = [...dataTransfer.types].filter(type => {
            return type == 'text/uri-list'
        }).map(type => dataTransfer.getData(type))

        if (dataList.length) {
            this.read(IMAGE_GET_URL, dataList, (img) => imageResources.push(new URLImageResource(img)) )
        }

        var files = [...dataTransfer.files]; 

        if (files.length) {
            this.read(IMAGE_GET_FILE, files, (img) => imageResources.push(new FileImageResource(img)) )
        }

        var layer = editor.selection.currentLayer;
        if (layer) {
            imageResources.forEach(resource => {
                //이미지 태그를 넣을까? 
                var backgroundImage = layer.addBackgroundImage(new BackgroundImage({
                    index: -1   // 가장 앞으로 추가 
                }));
                backgroundImage.addImageResource(resource)
            })
        }

    }

    [DROP('document')] (e) {
        e.preventDefault(); 
        this.addImageResource(e.dataTransfer);
    }    

    [PASTE('document')] (e) {
        this.addImageResource(e.clipboardData);
    }
}