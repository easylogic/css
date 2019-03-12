import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, SELF } from "../../../../util/Event";
import { CHANGE_ARTBOARD, CHANGE_EDITOR, CHANGE_SELECTION} from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { editor } from "../../../../editor/editor";
import { Project } from "../../../../editor/Project";
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
            <div class="project-list" ref="$pageList"></div>
        </div>`
    }

    makeItemNodeProject (project) {
        var selected = project.selected ? 'selected' : EMPTY_STRING; 
        return `<div class='tree-item ${selected}' id="${project.id}" type='project'>
            <div class="item-title">${project.title}</div>   
        </div>`
    }

    [LOAD('$pageList')] () {
        return editor.projects.map(project => {
            return this.makeItemNodeProject(project); 
        });
    }

    refresh () { 
        this.load()
    }

    [EVENT(
        CHANGE_ARTBOARD,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }
 
    [CLICK('$addProject')] (e) {
        var project = editor.addProject(new Project({ name: 'New Project'}))
        project.select();
        editor.send(CHANGE_SELECTION);
    }
} 