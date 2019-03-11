const config = new Map()

export class Config {

    constructor (editor) {
        this.editor = editor;
    }

    get (key) {
        return config[key]
    }

    set (key, value) {
        config[key] = value; 
    }

}