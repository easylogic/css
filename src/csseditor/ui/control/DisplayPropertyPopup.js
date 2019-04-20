import UIElement, { EVENT } from "../../../util/UIElement";
import { CLICK, CHANGE, ALT, IF } from "../../../util/Event";
import { Length } from "../../../editor/unit/Length";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../types/event";

export default class DisplayPropertyPopup extends UIElement {
  initialize() {
    super.initialize();

    this.data = {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start'
    };
  }

  templateForFlexDirection() {
    return `
      <div class='popup-item'>
        <label>Flex Direction</label>
        <div class='flex-direction grid-5' ref="$flexDirection" data-value="row">
            <button type="button" value="row" >row</button>
            <button type="button" value="row-reverse">row-reverse</button>
            <button type="button" value="column">column</button>
            <button type="button" value="column-reverse">column-reverse</button>
        </div>
      </div> 
    `;
  }

  [CLICK('$flexDirection button')] ({$delegateTarget: $t}) {
    var flexDirection = $t.value; 
    this.refs.$flexDirection.attr('data-value', flexDirection)
    this.updateData({flexDirection})
  }

  templateForFlexWrap() {
    return `
      <div class='popup-item'>
        <label>Flex Wrap</label>
        <div class='flex-wrap grid-5' ref="$flexWrap" data-value="nowrap">
            <button type="button" value="nowrap" >nowrap</button>
            <button type="button" value="wrap">wrap</button>
            <button type="button" value="wrap-reverse">wrap-reverse</button>
        </div>
      </div> 
    `;
  }

  [CLICK('$flexWrap button')] ({$delegateTarget: $t}) {
    var flexWrap = $t.value; 
    this.refs.$flexWrap.attr('data-value', flexWrap)
    this.updateData({flexWrap})
  }

  
  templateForJustifyContent() {
    return `
      <div class='popup-item'>
        <label>Justify Content</label>
        <div class='justify-content grid-5' ref="$justifyContent" data-value="flex-start">
            <button type="button" value="flex-start" >flex-start</button>
            <button type="button" value="flex-end">flex-end</button>
            <button type="button" value="center">center</button>
            <button type="button" value="space-between">space-between</button>
            <button type="button" value="space-around">space-around</button>
        </div>
      </div> 
    `;
  }  
  [CLICK('$justifyContent button')] ({$delegateTarget: $t}) {
    var justifyContent = $t.value; 
    this.refs.$justifyContent.attr('data-value', justifyContent)
    this.updateData({justifyContent})
  }

  template() {
    return `
      <div class='popup display-property-popup'>
        <div class='popup-title'>Display</div>
        <div class='popup-content'>
          ${this.templateForFlexDirection()}        
          ${this.templateForFlexWrap()}
          ${this.templateForJustifyContent()}          
        </div>
      </div>
    `;
  }

  updateData (data) {
    this.emit('changeDisplayPropertyPopup', data);
  }

  refreshDisplayProperty () {
    this.refs.$flexDirection.attr('data-value', this.data.flexDirection);
    this.refs.$flexWrap.attr('data-value', this.data.flexWrap);
    this.refs.$justifyContent.attr('data-value', this.data.justifyContent);
  }

  [EVENT("showDisplayPropertyPopup")](data) {

    this.data = { ...this.data, ...data }; 

    this.refreshDisplayProperty();

    this.$el.css({
      top: Length.px(this.data.top),
      bottom: 'auto'
    }).show("inline-block");

    this.emit('hidePropertyPopup')
  }

  [EVENT(
    "hideDisplayPropertyPopup",
    'hidePropertyPopup',
    CHANGE_EDITOR,
    CHANGE_SELECTION
  )]() {
    this.$el.hide();
  }
}
