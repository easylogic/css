import BaseModule from "../../colorpicker/BaseModule";
import { GETTER, ACTION } from "../../util/Store";
import { TIMELINE_LIST, TIMELINE_PUSH, TIMELINE_SEEK, TIMELINE_NOT_EXISTS, TIMELINE_NOT_EXISTS_KEYFRAME, TIMELINE_MIN_TIME_IN_KEYFRAMES, TIMELINE_MAX_TIME_IN_KEYFRAMES } from "../types/TimelineTypes";
import { ITEM_MAP_TIMELINE_CHILDREN, ITEM_MAP_KEYFRAME_CHILDREN } from "../types/ItemSearchTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../types/SelectionTypes";
import { CHANGE_TIMELINE, ADD_TIMELINE, CHANGE_LAYER } from "../types/event";
import { ITEM_ADD_TIMELINE } from "../types/ItemCreateTypes";
import { TIMING_GET_VALUE } from "../../util/css/make";
import { ITEM_SET, ITEM_GET } from "../types/ItemTypes";

export default class TimelineManager extends BaseModule {

    afterDispatch () {
        this.$store.emit(CHANGE_TIMELINE);
    }

    [GETTER(TIMELINE_LIST)] ($store) {

        var pageId = $store.read(SELECTION_CURRENT_PAGE_ID);

        if (!pageId) return [];

        return $store.read(ITEM_MAP_TIMELINE_CHILDREN, pageId)
    }

    [ACTION(TIMELINE_PUSH)] ($store, targetId) {
        $store.read(SELECTION_CURRENT_PAGE_ID, pageId => {
            $store.run(ITEM_ADD_TIMELINE, targetId, pageId, (timelineId) => {
                $store.emit(ADD_TIMELINE, timelineId);
            });
        });

    }

    [GETTER(TIMELINE_NOT_EXISTS)] ($store, targetId) {
        return !$store.read(TIMELINE_LIST).filter(it => it.targetId == targetId).length
    }

    [GETTER(TIMELINE_NOT_EXISTS_KEYFRAME)] ($store, timelineId, property, startTime) {
        var list = $store.read(ITEM_MAP_KEYFRAME_CHILDREN, timelineId).filter(it => it.property == property);

        return !list.some(it => {
            return it.startTime <= startTime  &&  startTime <= it.endTime
        })
    }    

    [GETTER(TIMELINE_MIN_TIME_IN_KEYFRAMES)] ($store, keyframeId) {
        var keyframe = $store.read(ITEM_GET, keyframeId);

        var list = $store.read(ITEM_MAP_KEYFRAME_CHILDREN, keyframe.parentId).filter(it => {
            return it.property == keyframe.property && it.id != keyframeId
        });

        var minValue = Math.max(0, ...list.filter(it => {
            return it.endTime <= keyframe.startTime
        }).map(it => it.endTime))

        return minValue; 
    }

    [GETTER(TIMELINE_MAX_TIME_IN_KEYFRAMES)] ($store, keyframeId) {
        var keyframe = $store.read(ITEM_GET, keyframeId);

        var list = $store.read(ITEM_MAP_KEYFRAME_CHILDREN, keyframe.parentId).filter(it => {
            return it.property == keyframe.property && it.id != keyframeId
        });

        var maxValue = Math.min(Number.MAX_SAFE_INTEGER, ...list.filter(it => {
            return it.startTime >= keyframe.endTime
        }).map(it => it.startTime))

        return maxValue; 
    }    

    [ACTION(TIMELINE_SEEK)] ($store, currentTime, $container) {
        $store.read(TIMELINE_LIST).map( (timeline, index) => {
                    
            var currentKeyframes = $store.read(ITEM_MAP_KEYFRAME_CHILDREN, timeline.id).filter(keyframe => {
                return keyframe.startTime <= currentTime && currentTime <= keyframe.endTime
            });

            if (currentKeyframes.length) {

                var obj = { id: timeline.targetId  }

                currentKeyframes.forEach(keyframe => {

                    var value = TIMING_GET_VALUE(keyframe, currentTime);

                    var $input = $container.$(`[data-property="${keyframe.property}"][data-timeline-id="${keyframe.parentId}"]` );
                    $input.val(value);
            
                    obj[keyframe.property] = value; 
                })

                $store.run(ITEM_SET, obj);
                $store.emit(CHANGE_LAYER)
            }
        })
    }

}