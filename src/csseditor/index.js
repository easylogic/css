import CSSEditor from './editor/index'
import * as App from '../util/App';
import modules from './module/index';
export default {
    createCSSEditor (opts = { type: 'white'}) {
        switch(opts.type) {
        default:
            return App.start({
                modules,
                components: { CSSEditor },
                template: `<CSSEditor />`
            });            
        }
    },
    CSSEditor
}     