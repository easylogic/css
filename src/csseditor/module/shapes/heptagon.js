
import { CLIP_PATH_TYPE_POLYGON, SHAPE_TYPE_POLYGON } from "../../types/ItemTypes";
import heptagon from "../clip-path/heptagon";

export default {
    type: SHAPE_TYPE_POLYGON,
    clipPathType: CLIP_PATH_TYPE_POLYGON,
    ...heptagon,
}