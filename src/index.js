import './scss/index.scss'

import Util from './util/index'
import ColorPicker from './colorpicker/index'
import ImageEditor from './imageeditor/index'
import './extension/codemirror/index'


export default {
    ...Util,
    ...ColorPicker,
    ...ImageEditor
}