import UIElement, { MULTI_EVENT } from '../../../../../colorpicker/UIElement';
import { parseParamNumber } from '../../../../../util/filter/functions';
import { CHANGE_LAYER_RADIUS, EVENT_CHANGE_LAYER_RADIUS, EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from '../../../../types/event';
import { px } from '../../../../../util/css/types';
import { POINTERSTART, POINTERMOVE, POINTEREND } from '../../../../../util/Event';

export default class TopLeftRadius extends UIElement {

    initialize () {
        super.initialize()

        this.radiusKey = 'borderTopLeftRadius'
    }

    template () {
        return `<button type='button' data-value='radius top left'></button>`
    }


    refresh () {
        var isShow = this.isShow();

        this.$el.toggle(isShow)
        if (isShow) {
            this.setPosition()
        }
    }

    setPosition () {
        var layer = this.read('selection/current/layer')

        if (!layer) return; 

        var {x, y, width, height} = layer;

        this.setRadiusPosition(x, y, width, height, layer);

    }

    setRadiusPosition (x, y, width, height, layer) {

        var radius = layer[this.radiusKey] || '0px'
        this.$el.css('left', radius)
    }

    isShow () {
        var layer = this.read('selection/current/layer')
        if (!layer) return false; 

        if (this.read('selection/is/group')) return false;
        if (this.read('selection/ids').length > 1) return false;

        if (layer.fixedRadius) return false;         
        return this.read('selection/is/layer');
    }

    getRealRadius (radius, dx) {
        var minX = 0;
        var maxX = this.layerWidth; 

        return Math.max(Math.min(maxX, radius + dx), minX)
    }

    resize () {
        
        var dx = this.targetXY.x - this.xy.x
        var radius = this.getRealRadius(this.layerRadius, dx);

        var newValue = {id: this.layer.id, [this.radiusKey]: px( radius) }

        this.commit(CHANGE_LAYER_RADIUS, newValue)
        this.refresh();
    }

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER_RADIUS,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }


    [POINTERSTART()] (e) {

        var layer = this.read('selection/current/layer')

        if (!layer) return; 

        this.xy = e.xy;
        this.layer = layer; 

        this.layerRadius = parseParamNumber(layer[this.radiusKey] || '0px')
        
        this.layerWidth = parseParamNumber(this.layer.width) 
        this.layerHeight = parseParamNumber(this.layer.height) 

        this.emit('startRadius')                    
    }

    [POINTERMOVE('document')] (e) {
        if (this.xy) {
            this.targetXY = e.xy; 

            this.resize();      
        }

    }

    [POINTEREND('document')] (e) {
        this.xy = null 
        this.moveX = null;
        this.moveY = null; 

        this.emit('endRadius')
    }
}