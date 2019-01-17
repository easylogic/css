import BaseModule from "../../colorpicker/BaseModule";
import { ACTION } from "../../util/Store";
import { CHANGE_EDITOR } from "../types/event";
import { EXTERNAL_PASTE } from "./ExternalResourceTypes";
import { IMAGE_GET_URL, IMAGE_GET_FILE } from "./ImageTypes";


export default class ExternalResourceManager extends BaseModule {


    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    [ACTION(EXTERNAL_PASTE)] ($store, dataTransfer, layerId) {
        var items = [...dataTransfer.items]
        var types = [...dataTransfer.types].filter(type => type == 'text/uri-list');
        
        var dataList = types.map(type => {
            return dataTransfer.getData(type);
        })
 
        if (dataList.length) {
            $store.read(IMAGE_GET_URL, dataList, (url) => {

                $store.run(ITEM_PREPEND_IMAGE_URL, url, true, layerId);
            })
        }

        var files = [...dataTransfer.files]; 
        if (files.length) {

            $store.read(IMAGE_GET_FILE, files, (img) => {
                $store.dispatch(ITEM_PREPEND_IMAGE_FILE, img, true, layerId);
            })
        }
    } 

}