import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, SELF } from "../../../../util/Event";
import { CHANGE_ARTBOARD, CHANGE_EDITOR, CHANGE_SELECTION} from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { editor } from "../../../../editor/editor";
import { Project } from "../../../../editor/items/Project";
import icon from "../../icon/icon";

export default class ProjectListView extends UIElement {

    template () { 
        return `
        <div class='project-list-view'>         
            <div class='project-toolbar'>
                <span class='title'>Project</span>
                <span class='project-tools'>
                    <div class="button-group">
                        <button type="button" ref="$addProject">${icon.add}</button>
                    </div>
                </span>
            </div>
            <div class="project-list" ref="$projectList"></div>
        </div>`
    }

    makeItemNodeProject (project) {
        var selected = project.selected ? 'selected' : EMPTY_STRING; 
        return `<div class='tree-item ${selected}' item-id="${project.id}" type='project'>
            <div class="item-title">${project.title}</div>   
        </div>`
    }

    [LOAD('$projectList')] () {
        return editor.projects.map(project => {
            return this.makeItemNodeProject(project); 
        });
    }

    refresh () { 
        this.load()
    }


    toggleSelectedItem (id) {
        var selected = this.refs.$projectList.$('.selected');
        if (selected) {
            selected.removeClass('selected')
        }

        var item = this.refs.$projectList.$(`[item-id="${id}"]`);
        if (item) {
            item.addClass('selected');
        }
    }

    refreshSelection () {
        var project = editor.selection.currentProject;
        if (project) {
            this.toggleSelectedItem(project.id)
        }
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh()
    }

    [EVENT(CHANGE_SELECTION)] () {
        this.refreshSelection();
    }
 
    [CLICK('$addProject')] (e) {
        var project = editor.addProject(new Project({ name: 'New Project'}))
        project.select();
        this.refresh();
        this.emit(CHANGE_EDITOR);
    }

    [CLICK('$el .tree-item')] (e) {
        var id = e.$delegateTarget.attr('item-id');
        var project = editor.get(id);
        project.select();
        this.refreshSelection()
        this.emit(CHANGE_EDITOR);
    }
} 