
export const SEGMENT_TYPE_ROTATE = 'rotate';
export const SEGMENT_TYPE_MOVE = 'move';
export const SEGMENT_TYPE_TOP = 'to top';
export const SEGMENT_TYPE_LEFT = 'to left';
export const SEGMENT_TYPE_RIGHT = 'to right';
export const SEGMENT_TYPE_BOTTOM = 'to bottom';
export const SEGMENT_TYPE_TOP_RIGHT = 'to top right';
export const SEGMENT_TYPE_TOP_LEFT = 'to top left';
export const SEGMENT_TYPE_BOTTOM_RIGHT = 'to bottom right';
export const SEGMENT_TYPE_BOTTOM_LEFT = 'to bottom left';

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



Segment.MOVE = SEGMENT_TYPE_MOVE 
Segment.RIGHT = SEGMENT_TYPE_RIGHT 
Segment.TOP_RIGHT = SEGMENT_TYPE_TOP_RIGHT 
Segment.BOTTOM_RIGHT = SEGMENT_TYPE_BOTTOM_RIGHT
Segment.LEFT = SEGMENT_TYPE_LEFT
Segment.TOP_LEFT = SEGMENT_TYPE_TOP_LEFT
Segment.BOTTOM_LEFT = SEGMENT_TYPE_BOTTOM_LEFT
Segment.TOP = SEGMENT_TYPE_TOP
Segment.BOTTOM = SEGMENT_TYPE_BOTTOM