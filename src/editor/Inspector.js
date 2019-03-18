import {CHANGE_EDITOR } from "../csseditor/types/event";
import { isString, isObject, keyEach } from "../util/functions/func";
import property from "../csseditor/ui/control/panel/property/index";

export class Inspector {
    constructor(editor) {
        this.editor = editor;

        this.components = {}

        this.initialize()
    }

    initialize () {
        this.components = {}

        this.set(property)
    }

    initializeKeys () {
        this.keys = Object.keys(this.components)
    }

    set (key, PropertyClass) {
        if (isString(key)) {
            this.components[key] = PropertyClass
        } else if (isObject(key)) {
            keyEach(key, (key, PropertyClass) =>{
                this.components[key] = PropertyClass; 
            })
        }

        this.initializeKeys()
        this.editor.send(CHANGE_EDITOR)
    }

    remove (key) {
        delete this.components[key]

        this.initializeKeys()
        this.editor.send(CHANGE_EDITOR)        
    }


}