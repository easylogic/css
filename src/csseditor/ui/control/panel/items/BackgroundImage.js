
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_IMAGE,  CHANGE_SELECTION } from '../../../../types/event';
import { EVENT } from '../../../../../util/UIElement';
import { CLICK, SELF } from '../../../../../util/Event';
import { editor } from '../../../../../editor/editor';

export default class BackgroundImage extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item background-image'>
            <div class='items'>         
                <div>
                    <img ref="$image" style="max-width: 100%; height: 100px" />
                </div>
            </div>
        </div>
        `
    }

    onToggleShow () {
        this.refresh();
    }


    isShow () {
        return false;
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if (isShow) {
            var image = editor.selection.currentBackgroundImage;
            if (image) {
                this.refs.$image.attr('src', image.url)
            }
        }
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_SELECTION
    )] () {
        if (this.isPropertyShow()) {
            this.refresh()
        }
    }


    [CLICK('$blendList .blend-item') + SELF] (e) {
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, {
            blendMode: e.$delegateTarget.attr('data-mode')
        })
    }

}