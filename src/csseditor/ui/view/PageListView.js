import UIElement from '../../../colorpicker/UIElement';
import PageShowGrid from '../control/panel/items/PageShowGrid';
import { EVENT_CHANGE_PAGE, CHANGE_EDITOR } from '../../types/event';

export default class PageList extends UIElement {

    components () {
        return { PageShowGrid }
    }

    template () { 
        return `
            <div class='pages'>         
                <div class="page-list" ref="$pageList">
                
                </div>
                <div class='project-tools'>
                    <button type="button" ref="$exportButton">Export</button>                
                    <div class="property-item">
                        <label>Show Grid <input type='checkbox' ref="$check"></label>
                    </div>
                    <button type="button" class='view-sample' ref="$viewSample">
                        <div class="arrow"></div>
                    </button>                
                    <button type="button" ref="$saveButton">Save</button>
                    <a class="button" href="https://github.com/easylogic/css" target="_github_">Github</a>
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

        str += `<button type="button" class='add-page'>+ Project</button>`

        return str; 
    }

    refresh () { 
        this.load()
        this.read('/selection/current/page', (item) => {
            this.refs.$check.el.checked = this.read('/tool/get', 'show.grid');
        })        
    }

    'click $check' () {
        this.read('/selection/current/page', (item) => {
            this.dispatch('/tool/set', 'show.grid', this.refs.$check.el.checked)
        })
    }

    [EVENT_CHANGE_PAGE] () {
        this.refresh()
        this.emit(CHANGE_EDITOR)
    }

    'click $pageList .add-page' (e) {
        this.dispatch('/item/add/page', true);
        this.refresh();
    }

    'click $pageList .tree-item | self' (e) { 

        this.dispatch('/selection/one', e.$delegateTarget.attr('id'));       
        this.refresh();
    }

    'click $saveButton' (e) {
        this.run('/storage/save');
    }

    'click $viewSample' (e) {
        this.emit('togglePageSampleView');
    }    

    'click $exportButton' (e) {
        this.emit('showExport')
    }

} 