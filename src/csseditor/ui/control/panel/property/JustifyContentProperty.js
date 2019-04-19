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

export default class JustifyContentProperty extends BaseProperty {
  isHideHeader() {
    return true;
  }
  getBody() {
    return `
      <div class='property-item display-manager'>
        <label class='property-item-label'>Justify Content</label>
        <div class='property-item-input-field justify-content' ref='$justifyContent' selected-type='flex-start'>
          <div class='display' display-type='flex-start'>flex-start</div>
          <div class='display' display-type='flex-end'>flex-end</div>
          <div class='display' display-type='center'>center</div>
          <div class='display' display-type='space-between'>space-between</div>
          <div class='display' display-type='space-around'>space-around</div>
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

      if (item.display.type == "flex") {
        this.refs.$justifyContent.attr(
          "selected-type",
          item.display.justifyContent
        );
      }
    }
  }

  [CLICK("$justifyContent .display")](e) {
    var display = e.$delegateTarget.attr("display-type");
    var current = editor.selection.current;

    if (current) {
      this.refs.$justifyContent.attr("selected-type", display);
      current.display.justifyContent = display;

      this.emit(CHANGE_INSPECTOR);
    }
  }
}
