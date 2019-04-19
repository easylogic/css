import UIElement, { EVENT } from "../util/UIElement";
import { POINTERSTART, POINTERMOVE, POINTEREND } from "../util/Event";

export default class BaseBox extends UIElement {
  refresh() {}

  refreshColorUI(e) {}

  /** push change event  */
  changeColor(opt) {
    this.dispatch("changeColor", opt || {});
  }

  // Event Bindings
  [POINTEREND("document")](e) {
    this.onDragEnd(e);
  }

  [POINTERMOVE("document")](e) {
    this.onDragMove(e);
  }

  [POINTERSTART("$bar")](e) {
    e.preventDefault();
    this.isDown = true;
  }

  [POINTERSTART("$container")](e) {
    this.isDown = true;
    this.onDragStart(e);
  }

  onDragStart(e) {
    this.isDown = true;
    this.refreshColorUI(e);
  }

  onDragMove(e) {
    if (this.isDown) {
      this.refreshColorUI(e);
    }
  }

  /* called when mouse is ended move  */
  onDragEnd(e) {
    this.isDown = false;
  }

  [EVENT("changeColor")]() {
    this.refresh();
  }

  [EVENT("initColor")]() {
    this.refresh();
  }
}
