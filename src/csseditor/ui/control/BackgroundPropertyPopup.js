import UIElement, { EVENT } from "../../../util/UIElement";
import UnitRange from "./panel/items/element/UnitRange";
import { CLICK } from "../../../util/Event";
import { Length } from "../../../editor/unit/Length";
import { isString } from "../../../util/functions/func";

export default class BackgroundPropertyPopup extends UIElement {
  components() {
    return {
      UnitRange
    };
  }

  initialize() {
    super.initialize();

    this.data = {
      size: "auto",
      repeat: "repeat",
      x: Length.px(0),
      y: Length.px(0),
      width: Length.px(0),
      height: Length.px(0),
      maxWidth: 100,
      maxHeight: 100
    };
  }

  getMaxWidth() {
    return this.data.maxWidth;
  }
  getMaxHeight() {
    return this.data.maxHeight;
  }
  updateX(x) {
    this.updateData({ x });
  }
  updateY(y) {
    this.updateData({ y });
  }
  updateWidth(width) {
    this.updateData({ width });
  }
  updateHeight(height) {
    this.updateData({ height });
  }

  updateData(opt) {
    this.data = { ...this.data, ...opt };

    this.emit("changeBackgroundPropertyPopup", opt);
  }

  templateForSize() {
    return `
      <div class='popup-item'>
        <label>size</label>
        <div class='size-list' ref="$size" data-value="contain">
            <button type="button" value="contain" >contain</button>
            <button type="button" value="cover">cover</button>
            <button type="button" value="auto">auto</button>
        </div>
      </div>
    `;
  }

  [CLICK("$size button")]({ $delegateTarget: $t }) {
    this.refs.$size.attr("data-value", $t.value);
    this.updateData({ size: $t.value });
  }

  templateForX() {
    return `
      <div class='popup-item'>
        <label>X</label>
        <UnitRange 
            ref="$x" 
            min="-1000" max="1000" step="1" value="0" unit="px"
            maxValueFunction="getMaxWidth"
            updateFunction="updateX"
        />
      </div>
    `;
  }

  templateForY() {
    return `
      <div class='popup-item'>
        <label>y</label>
        <UnitRange 
            ref="$y" 
            min="-1000" max="1000" step="1" value="0" unit="px"
            maxValueFunction="getMaxHeight"
            updateFunction="updateY"
        />
      </div>
    `;
  }

  templateForWidth() {
    return `
    <div class='popup-item'>
      <label>Width</label>
      <UnitRange 
          ref="$width" 
          min="0" max="1000" step="1" value="0" unit="px"
          maxValueFunction="getMaxWidth"
          updateFunction="updateWidth"
      />
    </div>
    `;
  }

  templateForHeight() {
    return `
    <div class='popup-item'>
      <label>Height</label>
      <UnitRange 
          ref="$height" 
          min="0" max="1000" step="1" value="0" unit="px"
          maxValueFunction="getMaxHeight"
          updateFunction="updateHeight"
      />
    </div>
    `;
  }

  templateForRepeat() {
    return `
    <div class='popup-item'>
      <label>Repeat</label>
      <div class='repeat-list' ref="$repeat" data-value='repeat'>
          <button type="button" value='no-repeat' title="no-repeat"></button>
          <button type="button" value='repeat' title="repeat"></button>
          <button type="button" value='repeat-x' title="repeat-x"></button>
          <button type="button" value='repeat-y' title="repeat-y"></button>
          <button type="button" value='space' title="space"></button>
          <button type="button" value='round' title="round"></button>
      </div>
    </div>
    `;
  }

  [CLICK("$repeat button")]({ $delegateTarget: $t }) {
    this.refs.$repeat.attr("data-value", $t.value);
    this.updateData({ repeat: $t.value });
  }

  template() {
    return `
      <div class='popup background-property-popup'>
        <div class='popup-title'>Background Image</div>
        <div class='popup-content'>
          ${this.templateForSize()}        
          ${this.templateForX()}
          ${this.templateForY()}
          ${this.templateForWidth()}
          ${this.templateForHeight()}
          ${this.templateForRepeat()}
        </div>
      </div>
    `;
  }

  refreshUnitRange() {
    this.children.$x.refreshValue(this.data.x);
    this.children.$y.refreshValue(this.data.y);
    this.children.$width.refreshValue(this.data.width);
    this.children.$height.refreshValue(this.data.height);
    this.refs.$size.attr("data-value", this.data.size);
    this.refs.$repeat.val(this.data.repeat);
  }

  [EVENT("showBackgroundPropertyPopup")](data) {
    this.data = { ...this.data, ...data };

    if (this.data.x.isString()) {
      this.data.x = this.data.x.toPercent();
    }

    if (this.data.y.isString()) {
      this.data.y = this.data.y.toPercent();
    }

    this.refreshUnitRange();

    this.$el.show("inline-block");
  }

  [EVENT("hideBackgroundPropertyPopup")]() {
    this.$el.hide();
  }
}
