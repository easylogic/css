import UIElement from "../../../../../colorpicker/UIElement";

export default class BackgroundColor extends UIElement {
    template () {
        return `
            <div class='property-item background-color show'>
                <div class='items'>            
                    <div>
                        <label>Background Color</label>
                        <div style='cursor:pointer;' ref="$colorview" title="Click me!!">
                            <span class='color' ref="$color"></span>
                            <span class='color-text' ref="$colortext"></span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    '@changeEditor' () {
        this.refresh()
    }

    refresh() {
        this.read('/item/current/layer', (layer) => {
            this.refs.$color.css('background-color', layer.backgroundColor)
            this.refs.$colortext.text(layer.backgroundColor)
        });
    }

    'click $colorview' () {
        this.emit('toggleLayerColorPicker')
    }

}