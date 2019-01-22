
import { CLIP_PATH_TYPE_POLYGON, SHAPE_TYPE_POLYGON } from "../../types/ItemTypes";
import hexagon from "../clip-path/hexagon";


export default {
    type: SHAPE_TYPE_POLYGON,
    clipPathType: CLIP_PATH_TYPE_POLYGON,
    ...hexagon,
}