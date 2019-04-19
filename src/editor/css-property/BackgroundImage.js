import { Length, Position } from "../unit/Length";
import { keyMap } from "../../util/functions/func";
import { Property } from "../items/Property";
import { Gradient } from "../image-resource/Gradient";
import { ImageResource } from "../image-resource/ImageResource";

const RepeatList = ["repeat", "no-repeat", "repeat-x", "repeat-y"];

export class BackgroundImage extends Property {
  static parse(obj) {
    return new BackgroundImage(obj);
  }

  addImageResource(imageResource) {
    this.clear("image-resource");
    return this.addItem("image-resource", imageResource);
  }

  addGradient(gradient) {
    return this.addImageResource(gradient);
  }

  getDefaultObject() {
    return super.getDefaultObject({
      itemType: "background-image",
      type: "color",
      color: "#FFFFFF",
      checked: false,
      opacity: 1,
      blendMode: "normal",
      size: "auto",
      repeat: "repeat",
      width: Length.percent(100),
      height: Length.percent(100),
      x: Length.percent(0),
      y: Length.percent(0),
      image: new ImageResource()
    });
  }

  convert(json) {
    json.x = Length.parse(json.x);
    json.y = Length.parse(json.y);

    if (json.width) json.width = Length.parse(json.width);
    if (json.height) json.height = Length.parse(json.height);

    return json;
  }

  get image() {
    return this.json.image;
  }

  set image(image) {
    this.json.image = image;
  }

  checkField(key, value) {
    if (key === "repeat") {
      return RepeatList.includes(value);
    }

    return super.checkField(key, value);
  }

  toBackgroundImageCSS() {
    if (!this.json.image) return {};
    return {
      "background-image": this.json.image + ""
    };
  }

  toBackgroundPositionCSS() {
    var json = this.json;

    return {
      "background-position": `${json.x} ${json.y}`
    };
  }

  toBackgroundSizeCSS() {
    var json = this.json;
    var backgroundSize = "auto";

    if (json.size == "contain" || json.size == "cover") {
      backgroundSize = json.size;
    } else if (json.width.isPercent() && json.width.isPercent()) {
      // 기본 사이즈가 아닌 것만 표시 (100% 100% 이 아닐 때 )
      if (+json.width !== 100 || +json.height !== 100) {
        backgroundSize = `${json.width} ${json.height}`;
      }
    } else {
      backgroundSize = `${json.width} ${json.height}`;
    }

    return {
      "background-size": backgroundSize
    };
  }

  toBackgroundRepeatCSS() {
    var json = this.json;
    return {
      "background-repeat": json.repeat
    };
  }

  toBackgroundBlendCSS() {
    var json = this.json;
    return {
      "background-blend-mode": json.blendMode
    };
  }

  toBackgroundColorCSS() {
    var json = this.json;

    return {
      "background-color": json.color
    };
  }

  toCSS() {
    var json = this.json;

    if (json.type == "color") {
      return {
        ...this.toBackgroundColorCSS()
      };
    }

    var results = {
      ...this.toBackgroundImageCSS(),
      ...this.toBackgroundPositionCSS(),
      ...this.toBackgroundSizeCSS(),
      ...this.toBackgroundRepeatCSS(),
      ...this.toBackgroundBlendCSS()
    };

    return results;
  }

  toString() {
    return keyMap(this.toCSS(), (key, value) => {
      return `${key}: ${value}`;
    }).join(";");
  }
}
