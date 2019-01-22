
import { CLIP_PATH_TYPE_POLYGON, SHAPE_TYPE_POLYGON } from "../../types/ItemTypes";
import decagon from "../clip-path/decagon";

export default {
    type: SHAPE_TYPE_POLYGON,
    clipPathType: CLIP_PATH_TYPE_POLYGON,
    ...decagon,
}