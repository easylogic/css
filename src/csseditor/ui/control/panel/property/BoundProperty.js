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
import { INPUT, CLICK } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { Length } from "../../../../../editor/unit/Length";

export default class BoundProperty extends BaseProperty {
  getTitle() {
    return 'Bound'
  }
  getBody() {
    return `
        <div class='property-item grid-4'>
            <label class='property-item-label'>
                X
            </label>
            <div class='property-item-input-field'>
                <input type='number' ref="$x"> <span>px</span>
            </div>
            <label class='property-item-label'>
                Y
            </label>                
            <div class='property-item-input-field'>
                <input type='number' ref="$y"> <span>px</span>
            </div>
        </div>                
        <div class='property-item grid-4'>
            <label class='property-item-label'>
                <button type="button" ref="$rect">*</button>
                Width
            </label>
            <div class='property-item-input-field'>
                <input type='number' ref="$width"> <span>px</span>
            </div>
            <label class='property-item-label'>
                Height
            </label>                
            <div class='property-item-input-field'>
                <input type='number' ref="$height"> <span>px</span>
            </div>
        </div>
        `;
  }

  [EVENT(
    CHANGE_RECT,
    CHANGE_LAYER,
    CHANGE_ARTBOARD,
    CHANGE_EDITOR,
    CHANGE_SELECTION,
    CHANGE_INSPECTOR
  )]() {
    this.refresh();
  }

  refresh() {
    var item = editor.selection.currentRect;
    if (!item) return;

    this.refs.$width.val(item.width.value);
    this.refs.$height.val(item.height.value);
    this.refs.$x.val(item.x.value);
    this.refs.$y.val(item.y.value);
  }

  [CLICK("$rect")](e) {
    var widthValue = this.refs.$width.int();
    this.refs.$height.val(widthValue);
    editor.selection.updateRect(
      CHANGE_RECT,
      {
        width: Length.px(widthValue),
        height: Length.px(widthValue)
      },
      this
    );
  }

  [INPUT("$width")]() {
    editor.selection.updateRect(
      CHANGE_RECT,
      {
        width: Length.px(this.refs.$width.int())
      },
      this
    );
  }

  [INPUT("$height")]() {
    editor.selection.updateRect(
      CHANGE_RECT,
      {
        height: Length.px(this.refs.$height.int())
      },
      this
    );
  }

  [INPUT("$x")]() {
    editor.selection.updateRect(
      CHANGE_RECT,
      {
        x: Length.px(this.refs.$x.int())
      },
      this
    );
  }

  [INPUT("$y")]() {
    editor.selection.updateRect(
      CHANGE_RECT,
      {
        y: Length.px(this.refs.$y.int())
      },
      this
    );
  }
}
