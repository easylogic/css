import './scss/index.scss'

import Util from './util/index'
import ColorPicker from './colorpicker/index'
import CSSEditor from './csseditor/index'
import './extension/codemirror/index'


export default {
    ...Util,
    ...ColorPicker,
    ...CSSEditor
}