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

export default class FlexDirectionProperty extends BaseProperty {
  isHideHeader() {
    return true;
  }
  getBody() {
    return `
      <div class='property-item display-manager'>
        <label class='property-item-label'>Flex Direction</label>
        <div class='property-item-input-field flex-direction' ref="$flexDirection" selected-type="row">
          <div class='display' display-type='row'>row</div>
          <div class='display' display-type='row-reverse'>row-reverse</div>
          <div class='display' display-type='column'>column</div>
          <div class='display' display-type='column-reverse'>column-reverse</div>
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
        this.refs.$flexDirection.attr("selected-type", item.display.direction);
      }
    }
  }

  [CLICK("$flexDirection .display")](e) {
    var display = e.$delegateTarget.attr("display-type");
    var current = editor.selection.current;

    if (current) {
      this.refs.$flexDirection.attr("selected-type", display);
      current.display.direction = display;

      this.emit(CHANGE_INSPECTOR);
    }
  }
}
