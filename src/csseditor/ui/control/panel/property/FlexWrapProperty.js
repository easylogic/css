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

export default class FlexWrapProperty extends BaseProperty {
  isHideHeader() {
    return true;
  }
  getBody() {
    return `
      <div class='property-item display-manager'>
        <label class='property-item-label'>Flex Wrap</label>
        <div class='property-item-input-field flex-wrap' ref='$flexWrap' selected-type='nowrap'>
          <div class='display' display-type='nowrap'>nowrap</div>
          <div class='display' display-type='wrap'>wrap</div>
          <div class='display' display-type='wrap-reverse'>wrap-reverse</div>
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
      if (item.display.type == "flex") {
        this.refs.$flexWrap.attr("selected-type", item.display.flexWrap);
      }
    }
  }

  [CLICK("$flexWrap .display")](e) {
    var display = e.$delegateTarget.attr("display-type");
    var current = editor.selection.current;

    if (current) {
      this.refs.$flexWrap.attr("selected-type", display);
      current.display.flexWrap = display;

      this.emit(CHANGE_INSPECTOR);
    }
  }
}
