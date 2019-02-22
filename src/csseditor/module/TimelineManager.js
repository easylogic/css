import BaseModule from "../../colorpicker/BaseModule";
import { GETTER, ACTION } from "../../util/Store";
import { TIMELINE_LIST, TIMELINE_PUSH, TIMELINE_SEEK, TIMELINE_NOT_EXISTS, TIMELINE_NOT_EXISTS_KEYFRAME, TIMELINE_MIN_TIME_IN_KEYFRAMES, TIMELINE_MAX_TIME_IN_KEYFRAMES } from "../types/TimelineTypes";
import { ITEM_MAP_TIMELINE_CHILDREN, ITEM_MAP_KEYFRAME_CHILDREN } from "../types/ItemSearchTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../types/SelectionTypes";
import { CHANGE_TIMELINE, ADD_TIMELINE, CHANGE_LAYER } from "../types/event";
import { ITEM_ADD_TIMELINE } from "../types/ItemCreateTypes";
import { TIMING_GET_VALUE } from "../../util/css/make";
import { ITEM_SET, ITEM_GET } from "../types/ItemTypes";
import { keyEach } from "../../util/functions/func";

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
        var list = $store.read(TIMELINE_LIST);
        
        list.map( (timeline, index) => {
                    
            var keyframeList = $store.read(ITEM_MAP_KEYFRAME_CHILDREN, timeline.id);

            var propertyList = {}
            keyframeList.forEach(keyframe => {
                if (!propertyList[keyframe.property]) {
                    propertyList[keyframe.property] = []
                }

                propertyList[keyframe.property].push(keyframe);
            })

            var currentKeyframes = [] 

            keyEach(propertyList, (property, keyframes) => {

                var one = null

                for(var i = 0, len = keyframes.length; i < len; i++) {
                    var k = keyframes[i];
                    if (k.startTime <= currentTime && currentTime <= k.endTime) {
                        one = k; 
                        break; 
                    } else if (k.startTime > currentTime) {

                        if (i > 0) {
                            var temp = keyframes[i - 1]
                            one = {
                                property, 
                                timing: 'linear',           // 값의 변화가 없기에
                                startTime: temp.endTime, 
                                endTime: k.startTime , 
                                startValue: temp.endValue,
                                endValue: temp.endValue
                            }
                            break; 
                        }
                    }
                }

                if (one) {
                    currentKeyframes.push(one);
                }
            })

            if (currentKeyframes.length) {
                var targetItem = this.get(timeline.targetId)
                var obj = { id: timeline.targetId  }

                currentKeyframes.forEach(keyframe => {

                    var value = TIMING_GET_VALUE(targetItem, keyframe, currentTime);

                    if (keyframe.parentId) {
                        var $input = $container.$(`[data-property="${keyframe.property}"][data-timeline-id="${keyframe.parentId}"]` );
                        $input.val(value);
                    }

                    obj[keyframe.property] = value; 
                })

                $store.run(ITEM_SET, obj);
                $store.emit(CHANGE_LAYER)
            }
        })
    }

}