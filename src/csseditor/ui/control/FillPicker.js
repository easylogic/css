import UIElement, { EVENT } from "../../../util/UIElement";
import ColorPicker from "../../../colorpicker/index";
import icon from "../icon/icon";
import { CLICK } from "../../../util/Event";
import { EMPTY_STRING } from "../../../util/css/types";
import { html } from "../../../util/functions/func";
import { Length, Position } from "../../../editor/unit/Length";

const tabs = [
  { type: "color", title: "Color", selected: true },
  { type: "linear-gradient", title: "Linear Gradient" },
  { type: "repeating-linear-gradient", title: "Repeating Linear Gradient" },
  { type: "radial-gradient", title: "Radial Gradient" },
  { type: "repeating-radial-gradient", title: "Repeating Radial Gradient" },
  { type: "conic-gradient", title: "Conic Gradient" },
  { type: "repeating-conic-gradient", title: "Repeating Conic Gradient" },
  { type: "image", title: "Image", icon: icon.image }
];

export default class FillPicker extends UIElement {
  afterRender() {
    // this.$el.hide();

    var defaultColor = "rgba(0, 0, 0, 0)";

    this.colorPicker = ColorPicker.create({
      type: "sketch",
      position: "inline",
      container: this.refs.$color.el,
      color: defaultColor,
      onChange: c => {
        this.changeColor(c);
      }
    });

    setTimeout(() => {
      this.colorPicker.dispatch("initColor", defaultColor);
    }, 100);
  }

  initialize() {
    super.initialize();

    this.selectedTab = "color";
  }

  template() {
    return html`
      <div class="fill-picker">
        <div class="picker-tab">
          <div class="picker-tab-list" ref="$tab">
            ${tabs.map(it => {
              return `
                <span 
                    class='picker-tab-item ${
                      it.selected ? "selected" : EMPTY_STRING
                    }' 
                    data-select-type='${it.type}'
                    title='${it.title}'
                >
                    <div class='icon'>${it.icon || EMPTY_STRING}</div>
                </span>`;
            })}
          </div>
        </div>
        <div class="picker-tab-container" ref="$tabContainer">
          <div
            class="picker-tab-content selected"
            data-content-type="color"
            ref="$color"
          ></div>
          <div class="picker-tab-content" data-type="image" ref="$image"></div>
        </div>
      </div>
    `;
  }

  [CLICK("$tab .picker-tab-item")](e) {
    const type = e.$delegateTarget.attr("data-select-type");

    e.$delegateTarget.onlyOneClass("selected");

    //TODO: picker 타입이 바뀌면 내부 속성도 같이 바뀌어야 한다.
    this.selectTabContent(type, {
      type
    });
    this.emit("selectFillPickerTab", type);
  }

  selectTabContent(type, data = {}) {
    this.selectedTab = type;
    switch (type) {
      case "image":
        this.refs.$image.onlyOneClass("selected");
        this.emit("hideGradientEditor");
        break;
      case "color":
        this.refs.$color.onlyOneClass("selected");

        if (data.color) {
          this.colorPicker.initColorWithoutChangeEvent(data.color);
        }

        this.emit("hideGradientEditor");
        break;
      default:
        // gradient
        this.refs.$color.onlyOneClass("selected");

        let sample = {
          type: data.type || "linear-gradient",
          selectColorStepId: data.selectColorStepId,
          angle: data.angle || 0,
          radialType: data.radialType,
          radialPosition: data.radialPosition
        };
        if (data.colorsteps) {
          sample.colorsteps = data.colorsteps;
        }
        this.emit("showGradientEditor", sample);

        break;
    }
  }

  changeColor(color) {
    if (this.selectedTab == "color") {
      this.emit("changeFillPicker", { type: "color", color });
    } else {
      this.emit("changeColorPicker", color);
    }
  }

  [EVENT("showFillPicker")](data) {
    this.$el
      .css({
        top: Length.px(data.top),
        right: Length.px(320)
      })
      .show();

    this.selectTabContent(data.type, data);
  }

  [EVENT("hideFillPicker")]() {
    this.$el.hide();

    this.emit("hideGradientEditor");
  }

  [EVENT("selectColorStep")](color) {
    this.colorPicker.initColorWithoutChangeEvent(color);
  }

  [EVENT("changeColorStep")](data = {}) {
    this.emit("changeFillPicker", {
      type: this.selectedTab,
      ...data
    });
  }
}
