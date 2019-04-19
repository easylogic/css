import BaseProperty from "./BaseProperty";
import { html } from "../../../../../util/functions/func";
import { LOAD, CLICK, IF } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { EVENT } from "../../../../../util/UIElement";
import {
  CHANGE_RECT,
  CHANGE_LAYER,
  CHANGE_ARTBOARD,
  CHANGE_SELECTION,
  CHANGE_INSPECTOR
} from "../../../../types/event";
import { EMPTY_STRING } from "../../../../../util/css/types";
import icon from "../../../icon/icon";
import { BackgroundImage } from "../../../../../editor/css-property/BackgroundImage";
import { LinearGradient } from "../../../../../editor/image-resource/LinearGradient";
import { RepeatingLinearGradient } from "../../../../../editor/image-resource/RepeatingLinearGradient";
import { RadialGradient } from "../../../../../editor/image-resource/RadialGradient";
import { RepeatingRadialGradient } from "../../../../../editor/image-resource/RepeatingRadialGradient";
import { ConicGradient } from "../../../../../editor/image-resource/ConicGradient";
import { RepeatingConicGradient } from "../../../../../editor/image-resource/RepeatingConicGradient";
import { Gradient } from "../../../../../editor/image-resource/Gradient";
import Dom from "../../../../../util/Dom";
import { ColorStep } from "../../../../../editor/image-resource/ColorStep";
import { Position } from "../../../../../editor/unit/Length";

const names = {
  color: "Color",
  image: "Image",
  linear: "Linear",
  "repeating-linear": "Repeating Linear",
  radial: "Radial",
  "repeating-radial": "Repeating Radial",
  conic: "Conic",
  "repeating-conic": "Repeating Conic",
  "linear-gradient": "Linear",
  "repeating-linear-gradient": "Repeating Linear",
  "radial-gradient": "Radial",
  "repeating-radial-gradient": "Repeating Radial",
  "conic-gradient": "Conic",
  "repeating-conic-gradient": "Repeating Conic"
};

const types = {
  color: "color",
  image: "image",
  linear: "gradient",
  "repeating-linear": "gradient",
  radial: "gradient",
  "repeating-radial": "gradient",
  conic: "gradient",
  "repeating-conic": "gradient",
  "linear-gradient": "gradient",
  "repeating-linear-gradient": "gradient",
  "radial-gradient": "gradient",
  "repeating-radial-gradient": "gradient",
  "conic-gradient": "gradient",
  "repeating-conic-gradient": "gradient"
};

export default class FillProperty extends BaseProperty {
  getTitle() {
    return "Background";
  }
  getBody() {
    return `<div class='property-item fill-list' ref='$fillList'></div>`;
  }

  getTools() {
    return `
        <button type="button" ref="$add" title="add Fill">${icon.add}</button>
    `;
  }

  getColorStepList(backgroundImage) {
    switch (backgroundImage.image.type) {
      case "linear-gradient":
      case "repeating-linear-gradient":
      case "radial-gradient":
      case "repeating-radial-gradient":
      case "conic-gradient":
      case "repeating-conic-gradient":
        return this.getColorStepString(backgroundImage.image.colorsteps);
    }

    return EMPTY_STRING;
  }

  getColorStepString(colorsteps) {
    return colorsteps
      .map(step => {
        return `<div class='step' data-colorstep-id="${
          step.id
        }" style='background-color:${step.color};'></div>`;
      })
      .join(EMPTY_STRING);
  }

  [LOAD("$fillList")]() {
    var current = editor.selection.current;

    if (!current) return EMPTY_STRING;

    return current.backgroundImages.map((it, index) => {
      var backgroundType = types[it.type];
      var backgroundTypeName = names[it.type];

      var imageCSS = {};

      if (it.type === "color") {
        imageCSS = `background-color: ${it.color}`;
      } else {
        imageCSS = `background-image: ${
          it.image ? it.image.toString() : "none"
        }`;
      }

      return `
            <div class='fill-item' data-index='${index}' ref="fillIndex${index}" draggable='true' data-fill-type="${backgroundType}" >
                <div class='check'><input type='checkbox' checked='${
                  it.check ? "true" : "false"
                }'/></div>
                <div class='preview' data-index="${index}">
                    <div class='mini-view' style="${imageCSS}" ref="miniView${index}"></div>
                </div>
                <div class='fill-title' ref="fillTitle${index}">${backgroundTypeName}</div>
                <div class='colorcode'>
                    <input type='text' placeholder='#999999'  ref="colorText${index}"/>
                </div>
                <div class='colorsteps' ref="colorsteps${index}">
                  ${this.getColorStepList(it)}
                </div>
                <div class='tools'>
                  <button type="button" class='setting' data-index='${index}'>${
        icon.setting
      }</button>
                  <button type="button" class='remove' data-index='${index}'>${
        icon.remove2
      }</button>
                </div>
            </div>
        `;
    });
  }

  [EVENT(CHANGE_RECT, CHANGE_LAYER, CHANGE_ARTBOARD, CHANGE_SELECTION)]() {
    this.refresh();
    this.emit("hideFillPicker");
    this.emit("hideBackgroundPropertyPopup");
  }

  refresh() {
    this.load();
  }

  [CLICK("$add")](e) {
    var current = editor.selection.current;

    if (current) {
      var backgroundColor = current.backgroundImages.filter(
        img => img.type === "color"
      );

      if (backgroundColor.length) {
        var image = new BackgroundImage({
          type: "linear",
          checked: true,
          image: new LinearGradient({
            colorsteps: [
              new ColorStep({ color: "yellow", percent: 0, index: 0 }),
              new ColorStep({ color: "red", percent: 100, index: 100 })
            ]
          })
        });

        current.addBackgroundImage(image);
      } else {
        current.addBackgroundImage(
          new BackgroundImage({
            checked: true
          })
        );
      }

      this.refresh();

      this.emit(CHANGE_INSPECTOR);
    }
  }

  getFillData(backgroundImage) {
    let data = {
      type: backgroundImage.type
    };

    switch (data.type) {
      case "color":
        data.color = backgroundImage.color;
        break;
      case "image":
        data.image = backgroundImage.image;
        break;
      default:
        if (backgroundImage.image) {
          const image = backgroundImage.image;

          data.type = image.type;
          data.colorsteps = [...image.colorsteps];
          data.angle = image.angle;
          data.radialType = image.radialType || "ellipse";
          data.radialPosition = image.radialPosition || Position.CENTER;
        } else {
          data.colorsteps = [];
          data.angle = 0;
          data.radialType = "ellipse";
          data.radialPosition = Position.CENTER;
        }

        break;
    }

    return data;
  }

  notNeedColorPicker(e) {
    var $el = new Dom(e.target);
    const isPreview = $el.hasClass("preview");
    const isStep = $el.hasClass("step");
    return !isPreview && !isStep;
  }

  [CLICK("$fillList") + IF("notNeedColorPicker")](e) {
    this.emit("hideFillPicker");
  }

  [CLICK("$fillList .colorsteps .step")](e) {
    var selectColorStepId = e.$delegateTarget.attr("data-colorstep-id");
    var $preview = e.$delegateTarget.closest("fill-item").$(".preview");
    this.viewFillPicker($preview, selectColorStepId);
  }

  viewFillPicker($preview, selectColorStepId) {
    this.selectedIndex = +$preview.attr("data-index");
    this.current = editor.selection.current;

    if (!this.current) return;
    this.currentBackgroundImage = this.current.backgroundImages[
      this.selectedIndex
    ];

    var rect = $preview.rect();

    this.emit("showFillPicker", {
      ...this.getFillData(this.currentBackgroundImage),
      selectColorStepId,
      left: rect.left + 90,
      top: rect.top
    });
    this.viewBackgroundPropertyPopup();
  }

  viewBackgroundPropertyPopup($setting) {
    if ($setting) {
      this.selectedIndex = +$setting.attr("data-index");
    }

    this.current = editor.selection.current;

    if (!this.current) return;
    this.currentBackgroundImage = this.current.backgroundImages[
      this.selectedIndex
    ];

    const x = this.currentBackgroundImage.x;
    const y = this.currentBackgroundImage.y;
    const width = this.currentBackgroundImage.width;
    const height = this.currentBackgroundImage.height;
    const maxWidth = this.current.width;
    const maxHeight = this.current.height;
    const repeat = this.currentBackgroundImage.repeat;
    const size = this.currentBackgroundImage.size;

    this.emit("showBackgroundPropertyPopup", {
      x,
      y,
      width,
      height,
      maxWidth,
      maxHeight,
      repeat,
      size
    });
    // this.emit("hideFillPicker");
  }

  [CLICK("$fillList .preview")](e) {
    this.viewFillPicker(e.$delegateTarget);
  }

  [CLICK("$fillList .setting")](e) {
    this.viewBackgroundPropertyPopup(e.$delegateTarget);
  }

  setBackgroundColor(color) {
    if (this.currentBackgroundImage) {
      this.currentBackgroundImage.reset({
        type: "color",
        color
      });

      var $el = this.refs[`miniView${this.selectedIndex}`];
      if ($el) {
        $el.cssText(this.currentBackgroundImage.toString());
      }

      var $el = this.refs[`fillTitle${this.selectedIndex}`];
      if ($el) {
        $el.text(names["color"]);
      }

      var $el = this.refs[`colorText${this.selectedIndex}`];
      if ($el) {
        $el.val(color);
      }

      if (this.current) {
        this.emit("refreshItem", this.current);
      }
    }
  }

  createGradient(data, gradient) {
    const colorsteps = data.colorsteps;

    // linear, conic 은 angle 도 같이 설정한다.
    const angle = data.angle;

    // radial 은  radialType 도 같이 설정한다.
    const radialType = data.radialType;
    const radialPosition = data.radialPosition;

    let json = gradient.toJSON();
    delete json.itemType;
    delete json.type;

    switch (data.type) {
      case "linear-gradient":
        return new LinearGradient({
          ...json,
          colorsteps,
          angle
        });
      case "repeating-linear-gradient":
        return new RepeatingLinearGradient({
          ...json,
          colorsteps,
          angle
        });
      case "radial-gradient":
        return new RadialGradient({
          ...json,
          colorsteps,
          radialType,
          radialPosition
        });
      case "repeating-radial-gradient":
        return new RepeatingRadialGradient({
          ...json,
          colorsteps,
          radialType,
          radialPosition
        });
      case "conic-gradient":
        return new ConicGradient({
          ...json,
          colorsteps,
          angle,
          radialPosition
        });
      case "repeating-conic-gradient":
        return new RepeatingConicGradient({
          ...json,
          colorsteps,
          angle,
          radialPosition
        });
    }

    return new Gradient();
  }

  [EVENT("selectFillPickerTab")](type) {
    var typeName = types[type];
    var $fillItem = this.refs[`fillIndex${this.selectedIndex}`];
    $fillItem.attr("data-fill-type", typeName);
  }

  setGradient(data) {
    if (this.currentBackgroundImage) {
      this.currentBackgroundImage.reset({
        type: data.type,
        image: this.createGradient(data, this.currentBackgroundImage.image)
      });

      var $el = this.refs[`miniView${this.selectedIndex}`];
      if ($el) {
        $el.cssText(this.currentBackgroundImage.toString());
      }

      var $el = this.refs[`fillTitle${this.selectedIndex}`];
      if ($el) {
        $el.text(names[data.type]);
      }

      var $el = this.refs[`colorsteps${this.selectedIndex}`];
      if ($el) {
        $el.html(this.getColorStepString(data.colorsteps));
      }

      if (this.current) {
        this.emit("refreshItem", this.current);
      }
    }
  }

  [EVENT("changeFillPicker")](data) {
    switch (data.type) {
      case "color":
        this.setBackgroundColor(data.color);
        break;
      case "image":
        break;
      default:
        this.setGradient(data);
        break;
    }
  }

  [EVENT("changeBackgroundPropertyPopup")](data) {
    if (this.currentBackgroundImage) {
      this.currentBackgroundImage.reset({ ...data });

      if (this.current) {
        this.emit("refreshItem", this.current);
      }
    }
  }
}
