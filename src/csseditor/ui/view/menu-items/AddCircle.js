import MenuItem from "./MenuItem";
import { editor } from "../../../../editor/editor";
import { Circle } from "../../../../editor/shape/Circle";
import { Project } from "../../../../editor/Project";
import { ArtBoard } from "../../../../editor/ArtBoard";
import { CHANGE_EDITOR } from "../../../types/event";

export default class AddCircle extends MenuItem {

    getIcon() { return 'circle'; }
    getTitle () { return 'Circle'; }

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
            artboard = project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}));
            artboard.select()
        }

        var directory = editor.selection.currentDirectory;
        var layer;
        if (directory) {
            layer = directory.addLayer(new Circle({ name: 'New Circle'}));
        } else {
            var selectedLayer = editor.selection.currentLayer
            if (selectedLayer) {
                layer = selectedLayer.parent().addLayer(new Circle({
                    index: selectedLayer.index + 1,
                    name: 'New Circle'
                }));
            } else {
                layer = artboard.addLayer(new Circle({ name: 'New Circle'}));
            }
        }

        layer.select();      
        this.emit(CHANGE_EDITOR);
    }    
} 