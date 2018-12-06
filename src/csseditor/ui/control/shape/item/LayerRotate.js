
import { caculateAngle } from '../../../../../util/functions/math';
import UIElement from '../../../../../colorpicker/UIElement';
import { CHANGE_LAYER_TRANSFORM, EVENT_CHANGE_LAYER_TRANSFORM, EVENT_CHANGE_SELECTION } from '../../../../types/event';


export default class LayerRotate extends UIElement {

    initialize () {
        super.initialize()

        this.$board = this.parent.$board;
        this.$page = this.parent.$page;
    }

    template () {
        return `<button type='button' data-value='layer rotate'></button>`
    }

    resize () {

        var angle = caculateAngle (this.targetXY.x - this.layerCenterX,  this.targetXY.y - this.layerCenterY);

        var newValue = {id: this.layer.id, rotate: Math.floor(angle) - 270}
        this.commit(CHANGE_LAYER_TRANSFORM, newValue)
    }

    refresh () {
        var isShow = this.isShow();

        this.$el.toggle(isShow)
    }

    isShow() {
        return !this.read('/selection/is/group');
    }


    [EVENT_CHANGE_LAYER_TRANSFORM] () {
        this.refresh();
    }

    [EVENT_CHANGE_SELECTION] () {
        this.refresh();
    }


    'pointerstart' (e) {

        var layer = this.read('/selection/current/layer')

        if (!layer) return; 

        this.xy = e.xy;
        this.layer = layer; 

        this.$dom = this.read('/item/dom', layer.id);

        if (this.$dom) {
            var rect = this.$dom.rect()
            this.layerCenterX = rect.left + rect.width/2;
            this.layerCenterY = rect.top + rect.height/2;
        }
    }

    'pointermove document' (e) {
        if (this.xy) {
            this.targetXY = e.xy; 

            this.resize();
        }

    }

    'pointerend document' (e) {
        this.xy = null 
        this.moveX = null;
        this.moveY = null; 
    }
}