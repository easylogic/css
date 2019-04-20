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
import icon from "../../../icon/icon";

export default class LayoutProperty extends BaseProperty {
  isHideHeader() {
    return true;
  }
  getBody() {
    return `
      <div class='property-item display-manager'>
        <label class='property-item-label' data-display='inline' ref='$label'>
          Display
          <button type="button" ref='$screen'>${icon.screen}</button>
        </label>
        <div class='property-item-input-field display-list' ref="$displayList" selected-type="inline">
          <div class='display' display-type='inline'>INLINE</div>
          <div class='display' display-type='block'>BLOCK</div>
          <div class='display' display-type='flex'>FLEX</div>
          <div class='display' display-type='grid'>GRID</div>
          <div class='tools' >
            <button type="button" ref="$setting">${icon.setting}</button>
          </div>
        </div>
      </div>
    `;
  }

  [CLICK('$screen')] () {
    this.emit('toggleDisplayGridEditor')
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
      this.refs.$label.attr("data-display", item.display.type);
      this.refs.$displayList.attr("selected-type", item.display.type);
    }
  }

  [CLICK("$displayList .display")](e) {
    var display = e.$delegateTarget.attr("display-type");
    var current = editor.selection.current;

    if (current) {
      this.refs.$displayList.attr("selected-type", display);
      this.refs.$label.attr('data-display', display);
      current.changeDisplay(display);

      this.emit(CHANGE_INSPECTOR);
    }
  }



  getDisplayPropertyData () {
    let data = {}
    var current = editor.selection.current;

    if (current) {
      data.flexDirection = current.flexDirection
      data.flexWrap = current.flexWrap
      data.justifyContent = current.justifyContent
    }

    return data
  }

  [CLICK('$setting')] (e) {
  
    const rect = this.refs.$setting.rect();
    this.emit('showDisplayPropertyPopup', {
      ...this.getDisplayPropertyData(),
      top: rect.top + 30
    })
  }
}
