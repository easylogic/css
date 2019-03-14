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
import { LinearGradient } from "./image-resource/LinearGradient";
import { RadialGradient } from "./image-resource/RadialGradient";
import { RepeatingRadialGradient } from "./image-resource/RepeatingRadialGradient";
import { RepeatingConicGradient } from "./image-resource/RepeatingConicGradient";


const ClassList = {
    'project': Project,
    'artboard': ArtBoard,
    'group': Group,
    'layer': Layer,
    'clip-path': ClipPath,
    'image-resource': ImageResource,
    'colorstep': ColorStep,
    'background-image': BackgroundImage,
    'filter': Filter,
    'backdrop-filter': BackdropFilter,
    'box-shadow': BoxShadow,
    'mask-image': MaskImage,
    'text-shadow': TextShadow
}

const ImageResourceClassList = {
    'linear-gradient': LinearGradient,
    'repeating-linear-gradient': RepeatingLinearGradient,
    'radial-gradient': RadialGradient,
    'repeating-radial-gradient': RepeatingRadialGradient,
    'conic-gradient': ConicGradient,
    'repeating-conic-gradient': RepeatingConicGradient,        
    'url': URLImageResource
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

        keyEach(json, (id, item) => {
            let BaseClass = ClassList[item.itemType]

            if (item.itemType == 'image-resource') {
                let ImageBaseClass = ImageResourceClassList[item.type]

                if (ImageBaseClass) {
                    BaseClass = ImageBaseClass;
                }
            }

            editor.set(id, new BaseClass(item));
        })
    }
}