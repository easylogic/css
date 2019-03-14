import { SEGMENT_TYPE_MOVE, SEGMENT_TYPE_RIGHT, SEGMENT_TYPE_TOP_RIGHT, SEGMENT_TYPE_BOTTOM_RIGHT, SEGMENT_TYPE_LEFT, SEGMENT_TYPE_TOP_LEFT, SEGMENT_TYPE_BOTTOM_LEFT, SEGMENT_TYPE_TOP, SEGMENT_TYPE_BOTTOM } from "../../util/css/types";

const move = {
    [SEGMENT_TYPE_MOVE] : true 
}

const right = {
    [SEGMENT_TYPE_RIGHT]: true, 
    [SEGMENT_TYPE_TOP_RIGHT]: true, 
    [SEGMENT_TYPE_BOTTOM_RIGHT]: true
}
const left = {
    [SEGMENT_TYPE_LEFT]: true, 
    [SEGMENT_TYPE_TOP_LEFT]: true, 
    [SEGMENT_TYPE_BOTTOM_LEFT]: true
}
const top = {
    [SEGMENT_TYPE_TOP]: true, 
    [SEGMENT_TYPE_TOP_RIGHT]: true, 
    [SEGMENT_TYPE_TOP_LEFT]: true
}

const bottom = {
    [SEGMENT_TYPE_BOTTOM]: true, 
    [SEGMENT_TYPE_BOTTOM_LEFT]: true, 
    [SEGMENT_TYPE_BOTTOM_RIGHT]: true
}


export class Segment {
    static isMove (direction) { return move[direction]; }
    static isTop (direction) { return top[direction]; }
    static isRight (direction) { return right[direction]; }
    static isBottom (direction) { return bottom[direction]; }
    static isLeft (direction) { return left[direction]; }

}