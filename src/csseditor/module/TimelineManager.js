import BaseModule from "../../colorpicker/BaseModule";
import { GETTER, ACTION } from "../../util/Store";
import { TIMELINE_LIST, TIMELINE_PUSH } from "../types/TimelineTypes";
import { ITEM_MAP_TIMELINE_CHILDREN } from "../types/ItemSearchTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../types/SelectionTypes";
import { CHANGE_TIMELINE, ADD_TIMELINE } from "../types/event";
import { ITEM_ADD_TIMELINE } from "../types/ItemCreateTypes";

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

}