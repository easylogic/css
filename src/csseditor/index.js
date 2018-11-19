import CSSEditor from './editor/index'

export default {
    createCSSEditor (opts = { type: 'white'}) {
        switch(opts.type) {
        default:
            return new CSSEditor(opts);            
        }
    },
    CSSEditor
}     