import BaseProperty from "./BaseProperty";
import { EVENT } from "../../../../../util/UIElement";
import {
  CHANGE_RECT,
  CHANGE_EDITOR,
  CHANGE_SELECTION,
  CHANGE_LAYER,
  CHANGE_ARTBOARD,
  CHANGE_INSPECTOR
} from "../../../../types/event";
import { CLICK } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class LayoutProperty extends BaseProperty {
  isHideHeader() {
    return true;
  }
  getBody() {
    return `
      <div class='property-item display-manager'>
        <label class='property-item-label'>Display</label>
        <div class='property-item-input-field display-list' ref="$displayList" selected-type="inline">
          <div class='display' display-type='inline'>INLINE</div>
          <div class='display' display-type='block'>BLOCK</div>
          <div class='display' display-type='flex'>FLEX</div>
          <div class='display' display-type='grid'>GRID</div>
        </div>
      </div>
    `;
  }

  [EVENT(
    CHANGE_RECT,
    CHANGE_LAYER,
    CHANGE_ARTBOARD,
    CHANGE_EDITOR,
    CHANGE_SELECTION
  )]() {
    this.refresh();
  }

  refresh() {
    var item = editor.selection.currentRect;
    if (!item) return;

    if (item.display) {
      this.refs.$displayList.attr("selected-type", item.display.type);
    }
  }

  [CLICK("$displayList .display")](e) {
    var display = e.$delegateTarget.attr("display-type");
    var current = editor.selection.current;

    if (current) {
      this.refs.$displayList.attr("selected-type", display);
      current.changeDisplay(display);

      this.emit(CHANGE_INSPECTOR);
    }
  }
}
