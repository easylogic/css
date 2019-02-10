import UIElement from '../../../colorpicker/UIElement';
import menuItems from './menu-items/index';


export default class ToolMenu extends UIElement {

    components () {
        return menuItems
    }

    template () { 
        return `
            <div class='tool-menu'>
                <div class='items left'>
                    <Undo /><Redo />
                </div>
                <div class="items left">
                    <ShowGrid />
                    <ShowClipPath />
                    <ShowBackgroundImageSize />
                </div>
                <div class='items flex-2'>
                    <Rect /><Circle />
                </div>
                <div class='items  right'>
                    <Save />
                    <Export />
                    <ExportCodePen />
                    <ExportJSFiddle />
                    <Github />
                </div>                
            </div>
        `
    }

} 