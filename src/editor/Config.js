const config = new Map()

export class Config {

    constructor (editor) {
        this.editor = editor;

        this.initialize()
    }

    initialize() {
        this.set('canvas.width', 10000)
        this.set('canvas.height', 10000)
    }

    get (key) {
        return config[key]
    }

    set (key, value) {
        config[key] = value; 
    }

}