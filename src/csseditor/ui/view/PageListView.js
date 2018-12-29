import UIElement from '../../../colorpicker/UIElement';
import PageShowGrid from '../control/panel/items/PageShowGrid';
import { EVENT_CHANGE_PAGE, CHANGE_EDITOR } from '../../types/event';
import { CLICK, SELF } from '../../../util/Event';

export default class PageListView extends UIElement {

    components () {
        return { PageShowGrid }
    }

    template () { 
        return `
            <div class='pages'>         
                <div class="page-list" ref="$pageList">
                
                </div>
                <div class='project-tools'>
                    <button type="button" class='view-sample' ref="$viewSample"></button>                
                </div>
            </div>
        `
    }

    makeItemNode (node, index) {
        var item = this.read('/item/get', node.id);

        var page = this.read('/selection/current/page')

        var selectedId = '' 

        if (page) selectedId = page.id; 

        if (item.itemType == 'page') {
            return this.makeItemNodePage(item, index, selectedId);
        }

    }

    makeItemNodePage (item, index, selectedId) {
        var selected = item.id == selectedId ? 'selected' : ''; 
        return `
            <div class='tree-item ${selected}' id="${item.id}" type='page'>
                <div class="item-preview"></div>
                <div class="item-title">
                    ${item.name || `Project ${index}`}
                </div>   
            </div>
            `
    }

    'load $pageList' () {
        var str = this.read('/item/map/page', (item, index) => {
            return this.makeItemNode(item, index); 
        }).join('');

        str += `<button type="button" class='add-page'></button>`

        return str; 
    }

    refresh () { 
        this.load()
    }


    [EVENT_CHANGE_PAGE] () {
        this.refresh()
        this.emit(CHANGE_EDITOR)
    }

    [CLICK('$pageList .add-page')] (e) {
        this.dispatch('/item/add/page', true);
        this.refresh();
    }

    [CLICK('$pageList .tree-item') + SELF] (e) { 

        this.dispatch('/selection/one', e.$delegateTarget.attr('id'));       
        this.refresh();
    }

    [CLICK('$saveButton')] (e) {
        this.run('/storage/save');
    }

    [CLICK('$viewSample')] (e) {
        this.emit('togglePageSampleView');
    }    

    [CLICK('$exportButton')] (e) {
        this.emit('showExport')
    }

} 