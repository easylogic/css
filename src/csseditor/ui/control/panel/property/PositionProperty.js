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
import { INPUT, CLICK, BIND } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { Length } from "../../../../../editor/unit/Length";

export default class PositionProperty extends BaseProperty {
  initState() {
    return { x: 0, y: 0 };
  }

  getTitle() {
    return "Position";
  }
  getBody() {
    return `
        <div class='property-item grid-4'>
            <label class='property-item-label'> X </label>
            <div class='property-item-input-field'>
                <input type='number' ref="$x"> <span>px</span>
            </div>
            <label class='property-item-label'> Y </label>
            <div class='property-item-input-field'>
                <input type='number' ref="$y"> <span>px</span>
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

  [BIND("$x", "x")]() {
    return { value: this.state.x };
  }

  [BIND("$y", "y")]() {
    return { value: this.state.y };
  }

  refresh() {
    var item = editor.selection.current;
    if (!item) return;

    this.setState({
      x: item.x.value,
      y: item.y.value
    });
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
