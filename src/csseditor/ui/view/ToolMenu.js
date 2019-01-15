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
                    <Undo></Undo>
                    <Redo></Redo>
                    <ShowGrid></ShowGrid>                    
                </div>

                <div class='items flex-2'>
                    <Rect></Rect>
                    <Circle></Circle>
                </div>

                <div class='items'>
                    <Save></Save>
                </div>
                
                <div class='items  right'>
                    <Export></Export>
                    <ExportCodePen></ExportCodePen>
                    <ExportJSFiddle></ExportJSFiddle>
                    <Github></Github>                    
                </div>                
            </div>
        `
    }

} 