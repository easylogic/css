import octagon from "../clip-path/octagon";
import { CLIP_PATH_TYPE_POLYGON, SHAPE_TYPE_POLYGON } from "../../types/ItemTypes";

export default {
    type: SHAPE_TYPE_POLYGON,
    clipPathType: CLIP_PATH_TYPE_POLYGON,
    ...octagon,
}