import MacOSColorPicker from './macos/index'
import ChromeDevToolColorPicker from './chromedevtool/index'
import MiniColorPicker from './mini/index'
import MiniVerticalColorPicker from './mini-vertical/index'
import RingColorPicker from './ring/index'
import XDColorPicker from './xd/index'

export default {
    create (opts) {
        switch(opts.type) {
        case 'macos': 
            return new MacOSColorPicker(opts);
        case 'xd': 
            return new XDColorPicker(opts);            
        case 'ring': 
            return new RingColorPicker(opts);            
        case 'mini': 
            return new MiniColorPicker(opts);            
        case 'mini-vertical': 
            return new MiniVerticalColorPicker(opts);
        case 'sketch':
        case 'palette':
        default: 
            return new ChromeDevToolColorPicker(opts);
        }
    },
    ColorPicker: ChromeDevToolColorPicker,
    ChromeDevToolColorPicker,
    MacOSColorPicker,
    RingColorPicker,
    MiniColorPicker,
    MiniVerticalColorPicker,
    XDColorPicker
}    