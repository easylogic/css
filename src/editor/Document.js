import { editor } from "./editor";
import { keyEach, isString } from "../../../util/functions/func";
import { Project } from "./Project";
import { ArtBoard } from "./ArtBoard";
import { Group } from "./Group";
import { Layer } from "./Layer";
import { ClipPath } from "./css-property/ClipPath";
import { ImageResource } from "./image-resource/ImageResource";
import { ColorStep } from "./image-resource/ColorStep";
import { BackgroundImage } from "./css-property/BackgroundImage";
import { Filter } from "./css-property/Filter";
import { BackdropFilter } from "./css-property/BackdropFilter";
import { BoxShadow } from "./css-property/BoxShadow";
import { MaskImage } from "./css-property/MaskImage";
import { TextShadow } from "./css-property/TextShadow";


const ClassList = {
    project: Project,
    artboard: ArtBoard,
    group: Group,
    layer: Layer,
    'clip-path': ClipPath,
    'image-resource': ImageResource,
    colorstep: ColorStep,
    'background-image': BackgroundImage,
    filter: Filter,
    'backdrop-filter': BackdropFilter,
    'box-shadow': BoxShadow,
    'mask-image': MaskImage,
    'text-shadow': TextShadow
}

export class Document {
    static toJSON () {
        return JSON.stringify(editor.all)
    }

    static load (json) {
        editor.clear();
        if (isString(json)) {
            json = JSON.parse(json);
        }

        keyEach(json, (key, item) => {
            const BaseClass = ClassList[item.itemType]
            editor.set(item.id, new BaseClass(item));
        })
    }
}