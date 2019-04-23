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
import { CLICK, LOAD } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import icon from "../../../icon/icon";
import { EMPTY_STRING } from "../../../../../util/css/types";

export default class LayoutProperty extends BaseProperty {
  getTitle() {
    return 'Display'
  }

  getTools() {
    return `
      <button type="button" ref='$screen'>${icon.screen}</button>
      <button type="button" ref="$setting">${icon.setting}</button>
    `
  }
  getBody() {
    return `
      <div class='property-item display-manager' ref='$displayManager'></div>
    `;
  }


  templateForFlexDirection() {
    return `
      <div class='property-item'>
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
      <div class='property-item'>
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
      <div class='property-item'>
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


  [LOAD('$displayManager')] () {
    var item = editor.selection.currentRect;
    if (!item) return EMPTY_STRING;

    return `
      <div class='property-item-input-field display-list' ref="$displayList" selected-type="inline">
        <div class='display' display-type='inline'>INLINE</div>
        <div class='display' display-type='block'>BLOCK</div>
        <div class='display' display-type='flex'>FLEX</div>
        <div class='display' display-type='grid'>GRID</div>
      </div>
      ${this.templateForFlexDirection()}
      ${this.templateForFlexWrap()}
      ${this.templateForJustifyContent()}
    `
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

    this.load();    

    if (item.display) {
      this.refs.$displayList.attr("selected-type", item.display.type);
    }
  }

  [CLICK("$displayManager .display")](e) {
    var display = e.$delegateTarget.attr("display-type");
    var current = editor.selection.current;

    if (current) {
      this.refs.$displayList.attr("selected-type", display);
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
