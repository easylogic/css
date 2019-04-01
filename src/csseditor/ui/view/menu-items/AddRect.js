import MenuItem from "./MenuItem";
import { editor } from "../../../../editor/editor";
import { Rect } from "../../../../editor/shape/Rect";
import { Project } from "../../../../editor/items/Project";
import { ArtBoard } from "../../../../editor/items/ArtBoard";
import { CHANGE_EDITOR } from "../../../types/event";
import { Length } from "../../../../editor/unit/Length";

export default class AddRect extends MenuItem {
    getIcon() { return 'rect'; }
    getTitle () { return 'Rectangle'; }
    clickButton (e) {
        this.add();
    }

    add () {
        var project = editor.selection.currentProject;
        if (!project) {
            project = editor.addProject(new Project({ name: 'New Project'}));
            project.select()
        }

        var artboard = project.artboard || editor.selection.currentArtBoard; 

        if (!artboard) {
            artboard = project.add(new ArtBoard({ name: 'New ArtBoard'}));
            artboard.select()
        }

        var current = editor.selection.current; 

        var layer = current.add(new Rect({
            width: Length.px(100),
            height: Length.px(100)
        }))
        layer.select();      

        this.emit(CHANGE_EDITOR);
    }
} 