import UIElement, { EVENT } from "../../util/UIElement";
import Event, { POINTERSTART, POINTEREND, POINTERMOVE } from "../../util/Event";

export default class ColorPalette extends UIElement {
  template() {
    return `
        <div class="color-panel">
            <div ref="$saturation" class="saturation">
                <div ref="$value" class="value">
                    <div ref="$drag_pointer" class="drag-pointer"></div>
                </div>
            </div>        
        </div>        
        `;
  }

  setBackgroundColor(color) {
    this.$el.css("background-color", color);
  }

  refresh() {
    this.setColorUI();
  }

  calculateSV() {
    var pos = this.drag_pointer_pos || { x: 0, y: 0 };

    var width = this.$el.width();
    var height = this.$el.height();

    var s = pos.x / width;
    var v = (height - pos.y) / height;

    this.dispatch("changeColor", {
      type: "hsv",
      s,
      v
    });
  }

  setColorUI() {
    var x = this.$el.width() * this.$store.hsv.s,
      y = this.$el.height() * (1 - this.$store.hsv.v);

    this.refs.$drag_pointer.px("left", x);
    this.refs.$drag_pointer.px("top", y);

    this.drag_pointer_pos = { x, y };

    this.setBackgroundColor(this.read("getHueColor"));
  }

  setMainColor(e) {
    // e.preventDefault();
    var pos = this.$el.offset();
    var w = this.$el.contentWidth();
    var h = this.$el.contentHeight();

    var x = Event.pos(e).pageX - pos.left;
    var y = Event.pos(e).pageY - pos.top;

    if (x < 0) x = 0;
    else if (x > w) x = w;

    if (y < 0) y = 0;
    else if (y > h) y = h;

    this.refs.$drag_pointer.px("left", x);
    this.refs.$drag_pointer.px("top", y);

    this.drag_pointer_pos = { x, y };

    this.calculateSV();
  }

  [EVENT("changeColor")]() {
    this.refresh();
  }

  [EVENT("initColor")]() {
    this.refresh();
  }

  [POINTEREND("document")](e) {
    this.isDown = false;
  }

  [POINTERMOVE("document")](e) {
    if (this.isDown) {
      this.setMainColor(e);
    }
  }

  [POINTERSTART()](e) {
    this.isDown = true;
    this.setMainColor(e);
  }

  [POINTEREND()](e) {
    this.isDown = false;
  }
}
