import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, SELF } from "../../../../util/Event";
import { CHANGE_PAGE, CHANGE_EDITOR, CHANGE_SELECTION} from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { editor } from "../../../../editor/editor";
import { ArtBoard } from "../../../../editor/ArtBoard";
import { Project } from "../../../../editor/Project";

export default class ProjectListView extends UIElement {

    template () { 
        return `
        <div class='project-list-view'>         
            <div class='project-toolbar'>
                <span class='title'>Project</span>
                <span class='project-tools'>
                    <div class="button-group">
                        <button type="button" ref="$addProject">+</button>
                    </div>
                </span>
            </div>
            <div class="project-list" ref="$pageList"></div>
        </div>`
    }

    makeItemNodeProject (project) {
        var selected = project.selected ? 'selected' : EMPTY_STRING; 
        var title = project.title
        return `<div class='tree-item ${selected}' id="${project.id}" type='project'>
            <div class="item-title">${title}</div>   
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
        CHANGE_PAGE,
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